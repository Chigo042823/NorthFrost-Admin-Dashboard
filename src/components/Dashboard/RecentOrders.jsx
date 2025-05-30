export const RecentOrders = ({data}) => {

    let inc = 1;
    return (
        <div className="w-[calc(100%-16px)] h-[calc(100%-32px-16px)] overflow-auto my-2 mx-auto rounded-lg shadow overflow-y-auto">
                <table className="text-sm text-left table-auto border-collapse p-2 w-full">
                    <thead className="bg-stone-100 text-xs text-stone-700 uppercase sticky top-0">
                        <tr>
                            <th className="px-2 py-4"></th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Order (kg)</th>
                            <th className="px-6 py-4">Amt. (PhP)</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row) => {
                                return (
                                    <tr className="even: bg-gray-50 odd:bg-white hover:bg-gray-200 transition duration-100 ease-in-out">
                                        <td className="px-2 py-4">{inc++}</td>
                                        <td className="px-4 py-4">{row.client}</td>
                                        <td className="px-4 py-4">{row.location}</td>
                                        <td className="px-4 py-4">{row.order}</td>
                                        <td className="px-4 py-4">{row.amount}</td>
                                        <td className="px-4 py-4">{row.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}
