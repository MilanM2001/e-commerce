import { CartUpdateDto } from "../model/cart";
import api from "./api";

const getMyCart = async () => {
    try {
        const response = await api.get('/Cart/getMyCart');
        return response.data
    } catch (error) {
        console.error("Error in retrieving cart:", error)
        throw error
    }
};

const updateCart = async (cartUpdateDto: CartUpdateDto) => {
    try {
        await api.put("/Cart/updateCart", cartUpdateDto)
    } catch (error) {
        console.error("Cart Update error:", error)
        throw error
    }
}

export { getMyCart, updateCart }