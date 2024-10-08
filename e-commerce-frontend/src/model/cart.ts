import { ProductResponseDto } from "./product"

export type CartResponseDto = {
    id: number
    userEmail: string
    products: ProductResponseDto[]
    totalPrice: number
}