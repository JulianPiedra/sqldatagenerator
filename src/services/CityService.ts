import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/city_generation"

export const GetCities = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_city${query}`;
    return await ApiFetch(url);
}
