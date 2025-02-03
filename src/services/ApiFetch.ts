import ShowError from "../utils/ShowError";

export const ApiFetch = async (url: string) => {
    // Get the api key from the environment variables
    const apiKey = import.meta.env.VITE_X_API_KEY;

    //Include the api key in the header
    let header: Record<string, string> = {
        "Content-type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "X_API_KEY": apiKey,
    };


    const myInit: RequestInit = {
        method: "GET",
        headers: header,
        mode: "cors",
        cache: "default",
    };

    const myRequest = new Request(url, myInit);

    try {
        const response = await fetch(myRequest);
        if (response.ok) {
            return await response.json();
        } else {
            response.json().then((data) => {
            ShowError(String(data.message));
            });
        }
    } catch (error) {
        ShowError(String(error));
    }
};
