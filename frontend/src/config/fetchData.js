export const postFetch = async (url, body) => {
    let dataFetch = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            method: "POST",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
export const getFetch = async (url) => {
    let dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            method: "GET",
        },
    });
    let data = await dataFetch.json();
    return data;
};
export const deleteFetch = async (url, body) => {
    let dataFetch = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            method: "DELETE",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
export const putFetch = async (url, body) => {
    let dataFetch = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            method: "PUT",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
