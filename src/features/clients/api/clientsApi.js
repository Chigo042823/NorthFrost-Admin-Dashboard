import { apiURL } from "@/shared/utils/env";

export async function getClients(token) {
    const resp = await fetch(apiURL + "clients", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function getClient(client_id, token) {;
    const resp = await fetch(apiURL + "clients/" + client_id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function addClient(data, token) {;
    const resp = await fetch(apiURL + "clients", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function updateClient(data, token) {;
    const id = data.client_id;
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function deleteClient(id, token) {;
    const resp = await fetch(apiURL + "clients/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}
