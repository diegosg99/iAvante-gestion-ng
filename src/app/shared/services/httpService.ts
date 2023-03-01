class httpService{

    post = (url:string,data:any) => {
        return fetch(url, {method: 'POST',body: JSON.stringify(data),headers: { "Content-Type": "application/json",'Access-Control-Allow-Methods': 'POST,PUT,GET,DELETE' }},).then(response => response.text());
    }
    delete = (url:string,data:any) => {
        return fetch(url, {method: 'DELETE',body: JSON.stringify(data),headers: { "Content-Type": "application/json" }}).then(response => response.text());
    }
    put = (url:string,data:any) => {
        return fetch(url, {method: 'PUT',body: JSON.stringify(data),headers: { "Content-Type": "application/json",'Access-Control-Allow-Methods': 'POST,PUT,GET,DELETE' }}).then(response => response.text());
    }
    get = (url:string,data:any) => {
        return fetch(url, {method: 'GET'}).then(response => response.text());
    }
}