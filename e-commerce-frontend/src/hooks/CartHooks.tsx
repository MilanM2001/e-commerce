import { useState } from "react"
import { getMyCart, updateCart } from "../services/CartService"
import { CartUpdateDto } from "../model/cart"
import { useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";

const useGetMyCart = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); // Redux dispatch

    const getMyCartHandler = async () => {
        try {
            setIsLoading(true);
            const res = await getMyCart();

            if (res) {
                // Extract the products and total price from the response
                const { cartProducts, totalPrice } = res;

                // Dispatch only the products
                dispatch(setCart({ products: cartProducts, totalPrice })); // Pass products and total price to the action
            }

            return res
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { getMyCartHandler, loading, error };
};

const useUpdateCart = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCartHandler = async (cartUpdateDto: CartUpdateDto) => {
        try {
            setIsLoading(true)
            await updateCart(cartUpdateDto)
        } catch (error: any) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { updateCartHandler, loading, error }
}

export { useGetMyCart, useUpdateCart }