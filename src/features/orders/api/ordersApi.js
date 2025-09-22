import { handleResponse } from "@/shared/utils/responseHandler";
import { apiURL } from "@/shared/utils/env";

export async function getOrders(token) {
    const resp = await fetch(apiURL + "orders", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return handleResponse(resp)
}

export async function getOrder(order_id, token) {
    const resp = await fetch(apiURL + "orders/" + order_id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    return handleResponse(resp)
}

export async function addOrder(data, token) {
    const resp = await fetch(apiURL + "orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    })
    
    return handleResponse(resp)
}

export async function updateOrder(data, token) {
    const id = data.order_id;
    const resp = await fetch(apiURL + "orders/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    })
    
    return handleResponse(resp)
}

export async function deleteOrder(id, token) {
    const resp = await fetch(apiURL + "orders/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return handleResponse(resp)
}
