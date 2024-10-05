import { ProductRequest } from "../model/product"
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

const getProductById = async (id: number) => {
    try {
        const res = await api.get(`/Product/${id}`)
        return res.data
    } catch (error) {
        console.error("Error in finding product by id:", error)
        throw error
    }
}

const createProduct = async (productRequest: ProductRequest) => {
    try {
        await api.post("/Product/create", productRequest)
    } catch (error) {
        console.error("Create Product error:", error)
        throw error
    }
}

export { getAllProducts, getProductById, createProduct }