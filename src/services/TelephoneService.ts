import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants.tsx';

const endpoint = "/telephone_generation"

export const GetEmails = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_telephone${query}`;
    return await ApiFetch(url);
}
