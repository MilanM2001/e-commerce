import { ProductUpdateDto } from "../model/product"
import api from "./api"

const getAllProducts = async () => {
    try {
        const response = await api.get('/Product/all')
        return response.data
    } catch (error) {
        console.error("Error in finding products:", error)
        throw error
    }
}

const getAllProductsPageable = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await api.get(`/Product/allPageable?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error in finding products:", error);
        throw error;
    }
};


const getProductById = async (id: number) => {
    try {
        const res = await api.get(`/Product/${id}`)
        return res.data
    } catch (error) {
        console.error("Error in finding product by id:", error)
        throw error
    }
}

const createProduct = async (productRequest: FormData) => {
    try {
        await api.post("/Product/create", productRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    } catch (error) {
        console.error("Create Product error:", error);
        throw error;
    }
};

const updateProduct = async (id: number, productUpdate: ProductUpdateDto) => {
    try {
        await api.put(`/Product/update/${id}`, productUpdate)
    } catch (error) {
        console.error("Update Product error:", error)
        throw error
    }
}

export { getAllProducts, getAllProductsPageable, getProductById, createProduct, updateProduct }