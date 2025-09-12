export const OrderForm = ({data}) => {
    return (
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
                        defaultValue={data.date ? data.date.toISOString().split("T")[0] : null}
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
    )
}