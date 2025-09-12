import { MdCancel } from "react-icons/md"

export const OrderModal = ({data, visibleHandle}) => {
    return (
        <>
        <Modal data={data} visibleHandle={visibleHandle} />
        </>
    )
}

const Modal = ({data, visibleHandle}) => {
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
            <div className="rounded-xl bg-white w-[80vw] h-[88vh] opacity-100 p-4">
                <div className="text-3xl font-semibold text-stone-900 border-b-1 border-stone-400 pb-2 flex justify-between">
                    Order Details
                    <button className="text-red-500 flex items-center justify-center hover:text-red-600" 
                        onClick={() => visibleHandle(false)}>
                        <MdCancel size={36} />
                    </button>
                </div>
                <form className="space-y-3 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Client
                        </label>
                        <input
                        type="text"
                        defaultValue={data.client}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Location
                        </label>
                        <input
                        type="text"
                        defaultValue={data.location}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium text-stone-600">
                            Order (kg)
                        </label>
                        <input
                            type="number"
                            defaultValue={data.order}
                            className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-stone-600">
                            Amount (₱)
                        </label>
                        <input
                            type="number"
                            defaultValue={data.amount}
                            className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Date
                        </label>
                        <input
                        type="date"
                        defaultValue={data.date.toISOString().split("T")[0]}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600">
                        Status
                        </label>
                        <select
                        defaultValue={data.status}
                        className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                        <option>Awaiting Approval</option>
                        <option>Pending</option>
                        <option>Unpaid</option>
                        <option>Completed</option>
                        </select>
                    </div>
                </form>
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
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}