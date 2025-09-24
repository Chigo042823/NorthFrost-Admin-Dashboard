import { addUser } from "@/features/users/api/usersApi";
import { apiURL } from "@/shared/utils/env";

export async function loginUser(user_data) {
    const body = new URLSearchParams();
    body.append("username", user_data.email);
    body.append("password", user_data.password);

    console.log(apiURL)

    const resp = await fetch(apiURL + "auth/login", {
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