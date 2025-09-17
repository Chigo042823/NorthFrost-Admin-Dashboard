import { apiURL } from "../../../api/env";

export async function getClients() {
    const resp = await fetch(apiURL + "clients");
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function getClient(client_id) {
    const resp = await fetch(apiURL + "clients/" + client_id);
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
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
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function updateClient(data) {
    const id = data.client_id;
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function deleteClient(id) {
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "DELETE"
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}
