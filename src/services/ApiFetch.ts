
export const ApiFetch = async (url: string) => {
    const apiKey = import.meta.env.VITE_X_API_KEY;
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
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};
