export const ModalButtons = ({visibleHandle}) => {
    return (
        <div className="flex justify-end gap-3 mt-4">
            <button
                onClick={() => visibleHandle(false)}
                className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={() => visibleHandle(false)}
            >
                Save Changes
            </button>
        </div>
    )
}