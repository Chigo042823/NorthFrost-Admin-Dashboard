import { useModal } from "@/shared/contexts/modalContext";
import { useSaveClient } from "../api/useSaveClient";

export const ClientForm = ({data, onSuccess}) => {
    const modalCtx = useModal();
    let isInsert = !data;

    const saveClientMutation = useSaveClient({
        onSuccess: () => {
            modalCtx.setCurrentModal(null);
            onSuccess()
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());
        if (!isInsert) body.client_id = data.client_id;
        saveClientMutation.mutate({data: body})
    }

    return (
        <form onSubmit={handleSubmit} className="h-[78%] space-y-3 mt-2 px-2">
            <div>
                <label className="block text-sm font-medium text-stone-600">
                Client Name
                </label>
                <input
                type="text"
                name="name"
                defaultValue={data ? data.name : ""}
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
                defaultValue={data ? data.address : ""}
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
                defaultValue={data ? data.contactInfo : ""}
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
                defaultValue={data ? data.note : ""}
                rows={3}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={() => modalCtx.setCurrentModal()}
                    className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                    disabled={saveClientMutation.isPending}
                >
                    Save Client
                </button>
            </div>
        </form>
    )
}