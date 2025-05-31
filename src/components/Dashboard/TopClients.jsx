export const TopClients = ({data}) => {
    return (
        <div className="w-[calc(100%-16px)] overflow-auto my-2 mx-auto rounded-lg shadow">
            <table className="text-sm text-left table-auto border-collapse p-2 w-full">
                <thead className="bg-stone-100 text-xs text-stone-700 uppercase">
                    <tr>
                        <th className="px-2 py-4"></th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Amt. Received</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, i) => {
                            return (
                                <tr className="even: bg-gray-50 odd:bg-white hover:bg-gray-200 transition duration-100 ease-in-out"
                                    key={i}>
                                    <td className="px-2 py-4">{i + 1}</td>
                                    <td className="px-4 py-4">{row.client}</td>
                                    <td className="px-4 py-4">{row.amtReceived}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
