import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your cart item
interface CartItem {
    productId: number;
    product: {
        name: string;
        description: string;
        price: number;
    }; // Replace 'any' with your product type
    quantity: number;
}

// Define the initial state for the cart
interface CartState {
    products: CartItem[];
    totalPrice: number; // Include totalPrice in the CartState
}

// Initialize the state
const initialState: CartState = {
    products: [], // Ensure this is initialized as an empty array
    totalPrice: 0, // Initialize totalPrice as 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartItem[]>) {
            // Make sure action.payload is an array
            if (Array.isArray(action.payload)) {
                state.products = action.payload; // Set the cart to the fetched items
                state.totalPrice = action.payload.reduce((total, item) => total + (item.product.price * item.quantity), 0); // Calculate totalPrice
            } else {
                console.error('setCart expected an array but received:', action.payload);
            }
        },
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingProduct = state.products.find(item => item.productId === action.payload.productId);
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity; // Increase quantity if product already in cart
            } else {
                state.products.push(action.payload); // Add new product to cart
            }
            // Recalculate totalPrice
            state.totalPrice = state.products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.products = state.products.filter(item => item.productId !== action.payload); // Remove product from cart
            // Recalculate totalPrice
            state.totalPrice = state.products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        },
        // Add other reducers if necessary
    },
});

// Export the actions
export const { setCart, addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
