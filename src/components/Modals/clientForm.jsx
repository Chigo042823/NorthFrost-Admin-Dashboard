import { ModalButtons } from "./modalButtons"
import { addClient, updateClient } from "../../../api/clients";

export const ClientForm = ({loadingState, data, setFormVisible, text, isInsert, successHandler}) => {

    const [_, setIsLoading] = loadingState;

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        try {
            if (isInsert) {
                await addClient(data)
            } else {
                await updateClient(data.client_id, data)
            }
            await new Promise((resolve) => setTimeout(resolve, 800)).then();
            setFormVisible(false);
            console.log("Client saved!");
            successHandler();
        } catch (err) {
            if (err) {
                console.error(err)
            } 
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="h-[78%] space-y-3 mt-2 px-2">
            {
                !isInsert ? 
                    <input type="text" name="client_id" className="hidden" defaultValue={data.client_id && !isInsert ? data.client_id : null}/> : ""
            }
            <div>
                <label className="block text-sm font-medium text-stone-600">
                Client Name
                </label>
                <input
                type="text"
                name="name"
                defaultValue={data.name && !isInsert ? data.name : null}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Address
                </label>
                <input
                name="address"
                type="text"
                defaultValue={data.address && !isInsert ? data.address : null}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Contact Info
                </label>
                <input
                type="text"
                name="contactInfo"
                defaultValue={data.contactInfo && !isInsert ? data.contactInfo : null}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-600">
                Notes
                </label>
                <textarea
                name="note"
                defaultValue={data.note && !isInsert ? data.note : null}
                rows={3}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>
            <ModalButtons setFormVisible={setFormVisible} text={text}/>
            </form>
    )
}