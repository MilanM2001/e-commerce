export type LoginRequest = {
    email: string
    password: string
}

export type RegisterRequest = {
    email: string
    password: string
    name: string
    address: AddressRequest
}

type AddressRequest = {
    street: string
    city: string
    zipCode: string
    country: string
}

export type RefreshTokenRequest = {
    refreshToken: string
}