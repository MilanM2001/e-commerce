import { CartProduct } from "./cartProduct"

export type CartResponseDto = {
    id: number;
    userEmail: string;
    cartProducts: CartProduct[];
    totalPrice: number;
};

export type CartUpdateDto = {
    cartProducts: CartProduct[];
};