import { useNavigate } from "react-router-dom"
import { OrderRequestDto } from "../model/order"
import { AppRoute } from "../routes/RoutesEnum"
import { createOrder } from "../services/OrderService"
import { useState } from "react"

const useCreateOrder = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const createOrderHandler = async (orderRequestDto: OrderRequestDto) => {
        try {
            setIsLoading(true)
            await createOrder(orderRequestDto)
            navigate(AppRoute.HOME)
        } catch (error: any) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { createOrderHandler, loading, error }
}

export { useCreateOrder }