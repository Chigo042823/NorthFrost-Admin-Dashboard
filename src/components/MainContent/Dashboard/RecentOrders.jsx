import { DataTable } from "../../tables/Orders/data-table"

export const RecentOrders = ({data}) => {
    return (
        <div className="w-[calc(100%-16px)] h-[calc(100%-32px-16px)] overflow-auto my-2 px-2 mx-auto rounded-lg shadow overflow-y-auto">
                <DataTable data={data} />
        </div>
    )
}
