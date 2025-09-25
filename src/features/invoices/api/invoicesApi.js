import { apiURL } from "@/shared/utils/env";

export async function getInvoices(token) {
    const resp = await fetch(apiURL + "invoices/withclients", {
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

export async function getLastInvoiceNumber(token) {
    const resp = await fetch(apiURL + "invoices/lastnumber", {
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

export async function getInvoice(invoice_id, token) {;
    const resp = await fetch(apiURL + "invoices/" + invoice_id, {
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

export async function getInvoiceOrders(invoice_id, token) {;
    const resp = await fetch(apiURL + "invoices/" + invoice_id + "/orders", {
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

export async function addInvoice(data, token) {;
    const resp = await fetch(apiURL + "invoices", {
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

export async function updateInvoice(data, token) {;
    const id = data.invoice_id;
    const resp = await fetch(apiURL + "invoices/" + id, {
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

export async function deleteInvoice(id, token) {;
    const resp = await fetch(apiURL + "invoices/" + id, {
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
