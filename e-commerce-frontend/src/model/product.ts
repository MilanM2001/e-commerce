export type ProductRequest = {
    name: string
    description: string
    price: number
    quantity: number
    category: string
}

export type ProductResponse = {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    category: string
}