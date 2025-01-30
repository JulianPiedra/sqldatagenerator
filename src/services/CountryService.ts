import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants.tsx';

const endpoint = "/country_generation"

export const GetCountries = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_country${query}`;
    return await ApiFetch(url);
}
export const GetNumericCode = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_numeric_code${query}`;
    return await ApiFetch(url);
}
export const GetAlphaCode = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_alpha_code${query}`;
    return await ApiFetch(url);
}

