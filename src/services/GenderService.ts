import { ApiFetch } from "./ApiFetch.ts";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/gender_generation"

export const GetGender = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_gender${query}`;
    return await ApiFetch(url);
}
