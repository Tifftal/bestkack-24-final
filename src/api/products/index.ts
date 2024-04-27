import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
    products: '/main/graph/products',
    regions: '/main/regions'
};

export const getProducts = async () => {
    return await apiInstance.get(ENDPOINTS.products);
}

export const getRegions = async () => {
    return await apiInstance.get(ENDPOINTS.regions);
}