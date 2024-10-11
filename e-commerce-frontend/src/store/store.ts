import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import cartReducer

const rootReducer = combineReducers({
    cart: cartReducer, // Add other reducers as necessary
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;