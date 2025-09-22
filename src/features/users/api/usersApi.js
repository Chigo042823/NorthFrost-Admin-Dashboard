import { apiURL } from "@/shared/utils/env";

export async function loginUser(user_data) {
    const body = new URLSearchParams();
    body.append("username", user_data.email);
    body.append("password", user_data.password);

    const resp = await fetch(apiURL + "users/login", {
        method: "POST",
        body: body.toString(),
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })

    if (!resp.ok) {
        let message = `Error ${resp.status}`;
        try {
            const errJson = await resp.json();   // try to parse
            if (errJson.detail) {
            message = errJson.detail;          // just use the detail
            }
        } catch {
            const errText = await resp.text();   // fallback if not JSON
            message = errText || message;
        }
        throw new Error(message);
    }

    return resp.json()
}

export async function registerUser(user_data) {
    return await addUser(user_data);
}

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