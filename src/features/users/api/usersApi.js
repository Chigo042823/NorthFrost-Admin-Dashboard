import { apiURL } from "@/shared/utils/env";

export async function getUsers() {
    const resp = await fetch(apiURL + "users");
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function getUser(user_id) {
    const resp = await fetch(apiURL + "users/" + user_id);
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}

export async function addUser(data) {
    const resp = await fetch(apiURL + "users", {
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

export async function updateUser(data) {
    const id = data.user_id;
    const resp = await fetch(apiURL + "users/" + id, {
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

export async function deleteUser(id) {
    const resp = await fetch(apiURL + "users/" + id, {
        method: "DELETE"
    })
    
    if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Error ${resp.status}: ${errText}`);
    }

    return resp.json()
}