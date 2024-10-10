import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductRequestDto, ProductResponseDto } from "../model/product"
import { createProduct, getAllProducts, getProductById } from "../services/ProductService"
import { AppRoute } from "../routes/RoutesEnum"

const useGetAllProducts = () => {
    const [products, setProducts] = useState<ProductResponseDto[]>([]);
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
    return { products, loading, error }
}

const useGetProductById = (id: number) => {
    const [product, setProduct] = useState<ProductResponseDto | null>(null);
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
                console.error("Error in finding product by id:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getProductByIdHandler();
        }
    }, [id]);

    return { product, loading, error };
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