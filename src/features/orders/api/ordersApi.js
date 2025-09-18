import { handleResponse } from "@/shared/utils/responseHandler";
import { apiURL } from "@/shared/utils/env";

export async function getOrders() {
    const resp = await fetch(apiURL + "orders");

    return handleResponse(resp)
}

export async function getOrder(order_id) {
    const resp = await fetch(apiURL + "orders/" + order_id);
    
    return handleResponse(resp)
}

export async function addOrder(data) {
    const resp = await fetch(apiURL + "orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    return handleResponse(resp)
}

export async function updateOrder(data) {
    const id = data.order_id;
    const resp = await fetch(apiURL + "orders/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    return handleResponse(resp)
}

export async function deleteOrder(id) {
    const resp = await fetch(apiURL + "orders/" + id, {
        method: "DELETE"
    })

    return handleResponse(resp)
}
