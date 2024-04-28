import { apiInstance } from "../AxiosBaseApi";

const ENDPOINTS = {
    regions: "/main/regions" 
}

export const getRegions = async () => {
    return await apiInstance.get(ENDPOINTS.regions);
}
