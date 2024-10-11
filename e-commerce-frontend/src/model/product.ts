export type ProductRequestDto = {
    name: string
    description: string
    price: number
    quantity: number
    category: string
}

export type ProductUpdateDto = {
    name: string
    description: string
    price: number
    quantity: number
    category: string
}

export type ProductResponseDto = {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    category: string
}