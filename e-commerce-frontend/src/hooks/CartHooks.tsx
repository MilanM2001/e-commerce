import { useState } from "react"
import { getMyCart } from "../services/CartService"

const useGetMyCart = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getMeHandler = async () => {
        try {
            setIsLoading(true)
            const res = await getMyCart()
            return res
        } catch (error: any) {
            setError(error)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return { getMeHandler, loading, error }
}

export { useGetMyCart }