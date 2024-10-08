import api from "./api";

const getMyCart = async () => {
    try {
        const response = await api.get('/Cart/getMyCart');
        return response.data
    } catch (error) {
        console.error("Error in retrieving user:", error)
        throw error
    }
};

export { getMyCart }