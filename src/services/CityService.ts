import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants';

const endpoint = "/city_generation"

export const GetCities = async (query:string) => {
    const url = `${API_URL}${endpoint}/genere_city${query}`;
    return await ApiFetch(url);
}
