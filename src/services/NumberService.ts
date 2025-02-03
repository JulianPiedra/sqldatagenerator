import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/number_generation"

export const GetNumbers = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_number${query}`;
    return await ApiFetch(url);
}
