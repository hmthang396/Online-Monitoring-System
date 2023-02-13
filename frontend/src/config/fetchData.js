
export const postFetch = async (url, accessToken,body) => {
    let dataFetch = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            "Authorization" : accessToken,
            method: "POST",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
export const getFetch = async (url,accessToken) => {
    try{
        let dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization" : accessToken,
                method: "GET",
            },
        });
        let data = await dataFetch.json();
        return data;
    }catch(error){
        return error;
    }
};
export const downloadFetch = async (url,accessToken) => {
    try{
        let dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization" : accessToken,
                method: "GET",
            },
        });
        let data = await dataFetch.blob();
        return data;
    }catch(error){
        return error;
    }
};
export const downloadPostFetch = async (url,accessToken,body) => {
    try{
        let dataFetch = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization" : accessToken,
                method: "POST",
            },
            body: JSON.stringify(body)
        });
        let data = await dataFetch.blob();
        return data;
    }catch(error){
        return error;
    }
};
export const deleteFetch = async (url, body,accessToken) => {
    let dataFetch = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            "Authorization" : accessToken,
            method: "DELETE",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
export const putFetch = async (url,accessToken, body) => {
    let dataFetch = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            "Authorization" : accessToken,
            method: "PUT",
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
};
