export async function getClients() {
    const resp = await fetch("http://127.0.0.1:8000/clients");
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    return resp.json()
}

export async function getClient(client_id) {
    const resp = await fetch("http://127.0.0.1:8000/clients/" + client_id);
    if (!resp.ok) {
        throw new Error("Error fetching clients")
    } 
    return resp.json()
}

export async function addClient(data) {
    console.log(data)
    const resp = await fetch("http://127.0.0.1:8000/clients", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return resp.json()
}

export async function updateClient(id, data) {
    const resp = await fetch("http://127.0.0.1:8000/clients/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return resp.json()
}

export async function deleteClient(id) {
    const resp = await fetch("http://127.0.0.1:8000/clients/" + id, {
        method: "DELETE"
    })
    return resp.json()
}
