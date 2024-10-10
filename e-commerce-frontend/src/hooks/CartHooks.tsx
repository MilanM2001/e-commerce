import { useState } from "react"
import { getMyCart, updateCart } from "../services/CartService"
import { CartUpdateDto } from "../model/cart"
import { useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import { CartProduct } from "../model/cartProduct";

const useGetMyCart = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); // Redux dispatch

    const getMyCartHandler = async () => {
        try {
            setIsLoading(true);
            const res = await getMyCart(); // Fetch cart from API

            if (res) {
                dispatch(setCart(res)); // Save the fetched cart into Redux
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