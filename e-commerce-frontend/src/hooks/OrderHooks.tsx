import { useNavigate } from "react-router-dom"
import { OrderRequestDto, OrderResponseDto } from "../model/order"
import { AppRoute } from "../routes/RoutesEnum"
import { createOrder, getMyOrders } from "../services/OrderService"
import { useEffect, useState } from "react"

const useGetMyOrders = () => {
    const [orders, setOrders] = useState<OrderResponseDto[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMyOrdersHandler = async () => {
            try {
                setIsLoading(true)
                const res = await getMyOrders()
                setOrders(res)
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false)
            }

        }
        getMyOrdersHandler()
    }, [])
    return { orders, loading, error };
};

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

export { useGetMyOrders, useCreateOrder }