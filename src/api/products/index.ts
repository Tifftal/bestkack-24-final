import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
    products: '/main/graph/products',
    regions: '/main/regions',
    productsList: '/main/products',
    addToCart: '/main/order',
};

export const getProducts = async ({ startTime, endTime, region }: { startTime?: string, endTime?: string, region?: string }) => {
    let URL = ENDPOINTS.products + `?startTime=${startTime}&endTime=${endTime}`;
    if (region) {
        URL += `&region=${region}`
    }

    console.log(URL)

    return await apiInstance.get(URL);
}

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
