import { OrderRequestDto } from "../model/order"
import api from "./api"

const getMyOrders = async () => {
    try {
        const response = await api.get('/Order/myOrders');
        return response.data
    } catch (error) {
        console.error("Error in retrieving orders:", error)
        throw error
    }
};

const createOrder = async (orderRequestDto: OrderRequestDto) => {
    try {
        await api.post("/Order/create", orderRequestDto)
    } catch (error) {
        console.error("Create order error:", error)
        throw error
    }
}

export { getMyOrders, createOrder }