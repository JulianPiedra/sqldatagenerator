import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/id_generation"

export const GetIds = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_id${query}`;
    return await ApiFetch(url);
}
