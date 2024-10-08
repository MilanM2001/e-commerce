import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductRequestDto, ProductResponseDto } from "../model/product"
import { createProduct, getAllProducts, getProductById } from "../services/ProductService"
import { AppRoute } from "../routes/RoutesEnum"

const useGetAllProducts = () => {
    const [books, setProducts] = useState<ProductResponseDto[]>([]);
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

const useGetProductById = (id: number) => {
    const [book, setProduct] = useState<ProductResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductByIdHandler = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getProductById(id)
                setProduct(response);
            } catch (error: any) {
                setError(error);
                console.error("Error in finding book by ISBN:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getProductByIdHandler();
        }
    }, [id]);

    return { book, loading, error };
};

const useCreateProduct = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const createProductHandler = async (productRequest: ProductRequestDto) => {
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

export { useGetAllProducts, useGetProductById, useCreateProduct }