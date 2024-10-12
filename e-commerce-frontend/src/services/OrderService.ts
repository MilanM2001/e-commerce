import { OrderRequestDto } from "../model/order"
import api from "./api"

const createOrder = async (orderRequestDto: OrderRequestDto) => {
    try {
        await api.post("/Order/create", orderRequestDto)
    } catch (error) {
        console.error("Create order error:", error)
        throw error
    }
}

export { createOrder }