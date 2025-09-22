import { useModal } from "@/shared/contexts/modalContext";
import { useSaveUser } from "../api/userQueries";
import { useQueryClient } from "@tanstack/react-query";

export const UserForm = ({data}) => {
    const queryClient = useQueryClient();
    const modalCtx = useModal();
    let isInsert = !data;

    function onSuccess() {
        queryClient.invalidateQueries(["users"]);
    }

    const saveUserMutation = useSaveUser({
        onSuccess: () => {
            modalCtx.setCurrentModal(null);
            onSuccess()
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const body = Object.fromEntries(formData.entries());
        if (!isInsert) body.user_id = data.user_id;
        saveUserMutation.mutate({data: body})
    }

    return (
        <form onSubmit={handleSubmit} className="h-[78%] space-y-3 mt-2 px-2">
            <div>
                <label className="block text-sm font-medium text-stone-600">
                Username
                </label>
                <input
                type="text"
                name="username"
                defaultValue={data ? data.username : ""}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Email
                </label>
                <input
                name="email"
                type="text"
                defaultValue={data ? data.email : ""}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Role
                </label>
                <input
                type="text"
                name="role"
                defaultValue={data ? data.role : ""}
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
                    disabled={saveUserMutation.isPending}
                >
                    Save User
                </button>
            </div>
        </form>
    )
}