import { RevenueGraph } from "./RevenueGraph"
import { RecentOrders } from "./RecentOrders"
import { Card } from "@/features/orders/components/Card"

export const Widgets = ({ data }) => {
  return (
    <div className="px-4 py-2 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        <Card span={3} title={"Recent Orders"} href={"orders"}>
            <RecentOrders data={data} />
        </Card>
        <Card span={2} title={"Sales Overview"} href={"finances"}>
            <RevenueGraph />
        </Card>
    </div>
  )
}