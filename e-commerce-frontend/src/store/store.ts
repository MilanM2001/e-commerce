import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    // Add other reducers here as necessary
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Configure store
const store = configureStore({
    reducer: rootReducer,
    // Optional: middleware, devTools, etc.
});

export default store;