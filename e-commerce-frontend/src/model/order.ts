import { CartProduct } from "./cartProduct"
import { OrderedProductResponseDto } from "./orderedProduct"

export type OrderRequestDto = {
    cartId: number
    totalAmount: number
    cartProducts: CartProduct[]
}

export type OrderResponseDto = {
    id: number
    orderDate: Date,
    totalAmount: number,
    orderedProducts: OrderedProductResponseDto[]
}