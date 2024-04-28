import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
    products: '/main/graph/products',
    regions: '/main/regions',
    productsList: '/main/products',
    addToCart: '/main/order',
};

export const getProducts = async () => {
    return await apiInstance.get(ENDPOINTS.products);
};

export const getRegions = async () => {
    return await apiInstance.get(ENDPOINTS.regions);
};

export const getProductsList = async (pattern: string) => {
    return await apiInstance.get(`${ENDPOINTS.productsList}?page=0&size=100&sort=price,asc${pattern ? `&pattern=${pattern}` : ''}`);
};

export const addToCart = async (payload: Record<string, number | string>[]) => {
    return await apiInstance.put(ENDPOINTS.addToCart, 
        [...payload],
    );
};
