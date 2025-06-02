import { RevenueGraph } from "./RevenueGraph"
import { TopClients } from "./TopClients"
import { RecentOrders } from "./RecentOrders"

const clients = [
    {
        client: "Chilluxe",
        amtReceived: 2450
    },
    {
        client: "Gen Luna",
        amtReceived: 2000
    },
    {
        client: "Fernandos",
        amtReceived: 1970
    },
]

const orders = [
    {
        client: "Chilluxe",
        location: "Centro",
        order: 25,
        amount: 180,
        status: "Pending"
    }, 
    {
        client: "Asaricha",
        location: "Centro",
        order: 100,
        amount: 1020,
        status: "Pending"
    }, 
    {
        client: "Fernandos",
        location: "Centro",
        order: 25,
        amount: 180,
        status: "Delivered"
    }, 
    {
        client: "Urban Wave",
        location: "Centro",
        order: 50,
        amount: 360,
        status: "Out for Delivery"
    }, 
    {
        client: "Chilluxe",
        location: "Centro",
        order: 25,
        amount: 180,
        status: "Paid"
    }, 
]

export const Widgets = () => {
  return (
    <div className="px-4 py-2 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        <Card span={2} title={"Sales Overview"} href={"Finances"}>
            <RevenueGraph />
        </Card>
        <Card span={1} title={"Top Clients"} href={"Clients"}>
            <TopClients data={clients}/>
        </Card>
        <Card span={3} title={"Recent Orders"} href={"Orders"}>
            <RecentOrders data={orders} />
        </Card>
    </div>
  )
}

const Card = ({span, title, href, children}) => {
    const spans = [
        "",
        "col-span-1",
        "col-span-2",
        "col-span-3",
        "col-span-4",
    ];
    return (
    <div className={`p-2 shadow border border-stone-300 h-72 rounded-lg col-span-1 sm:${spans[span]}`}>
        <div className="flex place-content-between">
            <p className="text-sm text-stone-500 m-2 mt-1">{title}</p>
            <a href={href} className="text-sm text-stone-500 m-2 mt-1 hover:underline hover:text-stone-400 transition duration-150">See more</a>
        </div>
        {children}
    </div>)
}