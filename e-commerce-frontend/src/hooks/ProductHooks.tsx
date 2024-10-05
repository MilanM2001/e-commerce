import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductRequest, ProductResponse } from "../model/product"
import { createProduct, getAllProducts } from "../services/ProductService"
import { AppRoute } from "../routes/RoutesEnum"

const useGetAllProducts = () => {
    const [books, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getAllProductsHandler = async () => {
            try {
                setIsLoading(true)
                const res = await getAllProducts()
                setProducts(res)
            } catch (error: any) {
                setIsLoading(false)
                setError(error)
            } finally {
                setIsLoading(false)
            }

        }
        getAllProductsHandler()
    }, [])
    return { books, loading, error }
}

const useCreateProduct = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const createProductHandler = async (productRequest: ProductRequest) => {
        try {
            setIsLoading(true)
            await createProduct(productRequest)
            navigate(AppRoute.HOME)
        } catch (error: any) {
            if (error.response) {
                setErrorMessage("Error creating product")
            }
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { createProductHandler, loading, error, errorMessage }
}

export { useGetAllProducts, useCreateProduct }