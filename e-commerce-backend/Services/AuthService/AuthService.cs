using AutoMapper;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Repositories.UserRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace e_commerce_backend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly JwtSecurityTokenHandler _tokenHandler = new JwtSecurityTokenHandler();

        public AuthService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration, JwtSecurityTokenHandler tokenHandler)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
            _tokenHandler = tokenHandler;
        }

        // Register a user and initialize cart and address
        public async Task RegisterUserAsync(RegisterDto registerDto)
        {
            var user = _mapper.Map<User>(registerDto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            var cart = new Cart { UserEmail = registerDto.Email, TotalPrice = 0 };
            user.Cart = cart;
            user.Address = _mapper.Map<Address>(registerDto.Address);

            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveChangesAsync();
        }

        // Handle login, generate both access and refresh tokens
        public async Task<AuthenticationResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            var accessToken = GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken(user); // Generate the refresh token with claims

            var authenticationResponseDto = new AuthenticationResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };

            return authenticationResponseDto;
        }


        public string GenerateAccessToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(10), // Access token valid for 10 minutes
                signingCredentials: creds
            );

            return _tokenHandler.WriteToken(token);
        }

        // Generate a refresh token as a JWT valid for 2 days
        public string GenerateRefreshToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var refreshToken = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(2), // Refresh token expires in 2 days
                signingCredentials: creds
            );

            return _tokenHandler.WriteToken(refreshToken);
        }




        // Refresh token validation and access token generation
        public async Task<string> RefreshAccessTokenAsync(string refreshToken)
        {
            try
            {
                // Define token validation parameters for refresh token
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                    ValidateLifetime = true, // Important for refresh token expiration
                    ClockSkew = TimeSpan.Zero
                };

                // Validate the refresh token and extract claims
                var claimsPrincipal = _tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out SecurityToken validatedToken);

                // Ensure the token is a valid JWT and signed with the correct algorithm
                if (!(validatedToken is JwtSecurityToken jwtToken) || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                // Debug the claims extracted
                var claims = claimsPrincipal.Claims;
                foreach (var claim in claims)
                {
                    Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
                }

                // Extract the email from the token's "sub" claim
                var email = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Log to see if the email is being extracted
                Console.WriteLine("Extracted Email:", email);

                if (string.IsNullOrEmpty(email))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                // Fetch the user by email
                var user = await _userRepository.GetByEmailAsync(email);

                if (user == null)
                {
                    throw new SecurityTokenException("User not found");
                }

                // Generate and return a new access token for the user
                return GenerateAccessToken(user);
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Invalid refresh token", ex);
            }
        }



    }

}
