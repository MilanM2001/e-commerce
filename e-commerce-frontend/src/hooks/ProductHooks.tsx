import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductResponseDto, ProductUpdateDto } from "../model/product"
import { createProduct, getAllProducts, getAllProductsPageable, getProductById, updateProduct } from "../services/ProductService"
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
                setError(error)
            } finally {
                setIsLoading(false)
            }

        }
        getAllProductsHandler()
    }, [])
    return { products, loading, error }
}

const useGetAllProductsPageable = () => {
    const [products, setProducts] = useState<ProductResponseDto[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const getAllProductsHandler = async () => {
            try {
                setIsLoading(true);
                const res = await getAllProductsPageable(pageNumber, pageSize);
                setProducts(res.products);
                setTotalRecords(res.totalRecords);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getAllProductsHandler();
    }, [pageNumber]);

    return { products, totalRecords, loading, error, pageNumber, setPageNumber, pageSize };
};


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

    const createProductHandler = async (productRequest: FormData) => {
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

const useUpdateProduct = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const updateProductHandler = async (id: number, productUpdate: ProductUpdateDto) => {
        try {
            setIsLoading(true)
            await updateProduct(id, productUpdate)
            navigate(AppRoute.HOME)
        } catch (error: any) {
            if (error.response) {
                setErrorMessage("Error updating product")
            }
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { updateProductHandler, loading, error, errorMessage }
}

export { useGetAllProducts, useGetAllProductsPageable, useGetProductById, useCreateProduct, useUpdateProduct }