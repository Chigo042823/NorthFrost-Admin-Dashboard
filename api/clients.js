import { apiURL } from "./env";

export async function getClients() {
    const resp = await fetch(apiURL + "clients");
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    return resp.json()
}

export async function getClient(client_id) {
    const resp = await fetch(apiURL + "clients/" + client_id);
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    return resp.json()
}

export async function addClient(data) {
    console.log(data)
    const resp = await fetch(apiURL + "clients", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return resp.json()
}

export async function updateClient(id, data) {
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    return resp.json()
}

export async function deleteClient(id) {
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "DELETE"
    })
    return resp.json()
}
