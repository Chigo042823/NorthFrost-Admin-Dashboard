export const ClientForm = ({data}) => {
    return (
        <form className="h-[78%] space-y-3 mt-2 px-2 overflow-y-auto">
            <div>
                <label className="block text-sm font-medium text-stone-600">
                Client Name
                </label>
                <input
                type="text"
                defaultValue={data.client}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Location
                </label>
                <input
                type="text"
                defaultValue={data.location}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Contact Number
                </label>
                <input
                type="tel"
                defaultValue={data.contactNo}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-stone-600">
                    Total Orders
                </label>
                <input
                    type="number"
                    defaultValue={data.totalOrders}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-stone-600">
                    Pending Orders
                </label>
                <input
                    type="number"
                    defaultValue={data.pendingOrders}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Balance (₱)
                </label>
                <input
                type="number"
                defaultValue={data.balance}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-600">
                Notes
                </label>
                <textarea
                defaultValue={data.note}
                rows={3}
                className="mt-1 w-full border rounded-md px-3 py-2 text-stone-700 
                            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>
            </form>
    )
}