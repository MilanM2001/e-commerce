import { CartProduct } from "./cartProduct"

export type OrderRequestDto = {
    totalAmount: number
    cartProducts: CartProduct[]
}