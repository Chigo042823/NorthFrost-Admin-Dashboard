import { RevenueGraph } from "./RevenueGraph"
import { TopClients } from "./TopClients"
import { RecentOrders } from "./RecentOrders"

const orders = [
  {
    client: "Chilluxe",
    location: "Centro",
    order: 25,
    amount: 540,
    date: new Date("01/28/2025", ),
    status: "Pending",
  },
  {
    client: "Chilluxe",
    location: "Centro",
    order: 25,
    amount: 540,
    date: new Date("01/30/2025", ),
    status: "Pending",
  },
  {
    client: "Fernando's",
    location: "Vintar",
    order: 10,
    amount: 180,
    date: new Date("02/06/2025"),
    status: "Delivered",
  },
  {
    client: "Asaricha",
    location: "Home",
    order: 100,
    amount: 640,
    date: new Date("04/06/2025"),
    status: "Unpaid",
  },
  {
    client: "Asaricha",
    location: "Home",
    order: 100,
    amount: 640,
    date: new Date("20/05/2025"),
    status: "Paid",
  },
  {
    client: "General Luna",
    location: "Rizal st.",
    order: 25,
    amount: 200,
    date: new Date("05/30/2025"),
    status: "Awaiting Approval",
  }
];


export const Widgets = () => {
  return (
    <div className="px-4 py-2 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        <Card span={3} title={"Recent Orders"} href={"Orders"}>
            <RecentOrders data={orders} />
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