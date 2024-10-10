import { ProductResponseDto } from "./product"

export type CartProduct = {
    productId: number;
    product: ProductResponseDto;
    quantity: number;
};