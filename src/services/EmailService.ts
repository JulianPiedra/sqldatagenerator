import { ApiFetch } from "./ApiFetch";
import {API_URL} from '../constants.tsx';

const endpoint = "/email_generation"

export const GetEmails = async (query:string) => {
    const url = `${API_URL}${endpoint}/generate_email${query}`;
    return await ApiFetch(url);
}
