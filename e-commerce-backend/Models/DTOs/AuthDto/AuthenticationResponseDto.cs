namespace e_commerce_backend.Models.DTOs.AuthDto
{
    public class AuthenticationResponseDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
