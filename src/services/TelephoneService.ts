import { ApiFetch } from "./ApiFetch";
import { API_URL } from '../constants/constants.ts';

const endpoint = "/telephone_generation"

export const GetTelephones = async (query: string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_telephone${query}`;
    return await ApiFetch(url);
}
