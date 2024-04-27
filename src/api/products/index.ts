import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
    products: '/main/graph/products',
};

export const getProducts = async () => {
    return await apiInstance.get(ENDPOINTS.products);
}