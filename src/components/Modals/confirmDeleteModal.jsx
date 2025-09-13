import { ModalHeader } from "../Modals/modalHeader"
import { deleteClient } from "../../../api/clients"

export const ConfirmDeleteModal = ({title, deletefn, setConfirmDeleteVisible, warningString, deleteId, successHandler}) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
            <div className="relative rounded-xl bg-white w-[60vw] h-[40vh] opacity-100 p-4">
                <ModalHeader title={title} setFormVisible={setConfirmDeleteVisible}/>
                <div className="m-2 text-stone-700 h-auto">
                    {warningString}
                </div>
                <div className="flex justify-end gap-3 m-5 absolute bottom-0 right-0">
                    <button
                        onClick={() => setConfirmDeleteVisible(false)}
                        className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                        onClick={async () => {
                            try {
                                await deletefn(deleteId);
                                console.log("Deleted successfully!");
                                setConfirmDeleteVisible(false);
                                successHandler();
                            } catch (err) {
                                console.error(err)
                            }  finally {
                                
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}