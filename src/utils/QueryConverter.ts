//Creates the quey string for the api request based on the extraparameter given0
export const QueryConverter = (values: Record<string, string | number | boolean>) => {
    let query = ``;
    for (let key in values) {
        query += `${key}=${values[key]}&`;
    }
    return query.slice(0, -1);  // Remove the last "&"
};
