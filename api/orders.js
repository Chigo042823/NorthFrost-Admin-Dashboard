export async function getOrders() {
    const resp = await fetch("http://127.0.0.1:8000/orders");
    if (!resp.ok) {
        throw new Error("Error fetching orders")
    } 
    return resp.json()
}

export async function getOrder(order_id) {
    const resp = await fetch("http://127.0.0.1:8000/orders/" + order_id);
    if (!resp.ok) {
        throw new Error("Error fetching orders")
    } 
    return resp.json()
}

export async function addOrder(data) {
    const resp = await fetch("http://127.0.0.1:8000/orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return resp.json()
}

export async function updateOrder(id, data) {
    const resp = await fetch("http://127.0.0.1:8000/orders/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return resp.json()
}

export async function deleteOrder(id) {
    const resp = await fetch("http://127.0.0.1:8000/orders/" + id, {
        method: "DELETE"
    })
    return resp.json()
}
