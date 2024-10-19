import { useState } from "react"
import { getMyCart, updateCart } from "../services/CartService"
import { CartUpdateDto } from "../model/cart"
import { useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";

const useGetMyCart = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); 

    const getMyCartHandler = async () => {
        try {
            setIsLoading(true);
            const res = await getMyCart();

            if (res) {
                const { cartProducts, totalPrice, id } = res;

                dispatch(setCart({ products: cartProducts, totalPrice, cartId: id })); 
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