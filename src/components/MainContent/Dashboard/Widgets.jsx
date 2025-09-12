import { RevenueGraph } from "./RevenueGraph"
import { RecentOrders } from "./RecentOrders"

export const Widgets = () => {
  return (
    <div className="px-4 py-2 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        <Card span={3} title={"Recent Orders"} href={"Orders"}>
            <RecentOrders />
        </Card>
        <Card span={2} title={"Sales Overview"} href={"Finances"}>
            <RevenueGraph />
        </Card>
    </div>
  )
}

const Card = ({span, title, href, children}) => {
    const spans = [
        "",
        "sm:col-span-1",
        "sm:col-span-2",
        "sm:col-span-3",
        "sm:col-span-4",
    ];
    return (
    <div className={`p-2 shadow border border-stone-300 h-72 rounded-lg col-span-1 ${spans[span]}`}>
        <div className="flex place-content-between">
            <p className="text-sm text-stone-500 m-2 mt-1">{title}</p>
            <a href={href} className="text-sm text-stone-500 m-2 mt-1 hover:underline hover:text-stone-400 transition duration-150">See more</a>
        </div>
        {children}
    </div>)
}