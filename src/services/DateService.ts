import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/date_generation"

export const GetDates = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_date${query}`;
    return await ApiFetch(url);
}
