import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants.tsx';

const endpoint = "/name_generation"

export const GetWholeNames = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_whole_name${query}`;
    return await ApiFetch(url);
}
export const GetFirstNames = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_first_name${query}`;
    return await ApiFetch(url);
}
export const GetLastNames = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_last_name${query}`;
    return await ApiFetch(url);
}
