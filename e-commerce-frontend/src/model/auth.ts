export type LoginRequestDto = {
    email: string
    password: string
}

export type RegisterRequestDto = {
    email: string
    password: string
    name: string
    address: AddressRequestDto
}

type AddressRequestDto = {
    street: string
    city: string
    zipCode: string
    country: string
}

export type RefreshTokenRequestDto = {
    refreshToken: string
}