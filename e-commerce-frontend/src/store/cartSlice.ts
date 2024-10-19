import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../model/cartProduct';

interface CartState {
    products: CartProduct[];
    totalPrice: number;
    cartId: number;
}

const initialState: CartState = {
    products: [],
    totalPrice: 0,
    cartId: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<{ products: CartProduct[], totalPrice: number, cartId: number }>) {
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
            state.cartId = action.payload.cartId;
        },
        addToCart(state, action: PayloadAction<CartProduct>) {
            const existingProduct = state.products.find(
                (item) => item.productId === action.payload.productId
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            state.totalPrice = state.products.reduce(
                (total, item) => total + item.product.price * item.quantity, 0
            );
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.products = state.products.filter(
                (item) => item.productId !== action.payload
            );
            state.totalPrice = state.products.reduce(
                (total, item) => total + item.product.price * item.quantity, 0
            );
        },
    },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;