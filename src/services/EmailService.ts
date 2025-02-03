import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants/constants.ts';

const endpoint = "/email_generation"

export const GetEmails = async (query:string): Promise<any> => {
    const url = `${API_URL}${endpoint}/generate_email${query}`;
    return await ApiFetch(url);
}
