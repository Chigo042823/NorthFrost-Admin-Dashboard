import { useOrders } from "@/features/orders/api/orderQueries";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { MonthSelect } from "@/shared/components/monthSelect";
import { useEffect, useState } from "react";
import { monthOptions } from "@/shared/utils/month";
import { getDailyTotals } from "@/features/orders/utils/dailyTotal";

export const RevenueGraph = () => {
  const currMonth = new Date().getMonth();

  const [monthSelected, setMonthSelected] = useState(monthOptions[currMonth + 1]);

  const {data: orders = []} = useOrders();

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dailyTotals, setDailyTotals] = useState([]);

  const currMaxTotal = dailyTotals.reduce((max, curr) => Math.max(max, curr), -Infinity);
  const prevMaxTotal = dailyTotals.reduce((max, curr) => Math.max(max, curr), -Infinity);

  useEffect(() => {
    if (orders.length === 0) return;

    const paidOrders = orders.filter(order => order.status === "paid");

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (monthSelected.value === 0) {
      // All months
      const allTotals = getDailyTotals(paidOrders);

      const merged = allTotals.map(d => {
        const dt = new Date(d.date);
        return {
          day: dt.getDate(),
          month: dt.getMonth(),
          label: `${monthNames[dt.getMonth()]} ${dt.getDate()}`, // "Jan 5"
          current: d.total,
          previous: 0,
        };
      });

      setDailyTotals(merged);
      return;
    }

    // Specific month + previous month logic
    const selectedMonth = monthSelected.value - 1;
    const prevMonth = (selectedMonth - 1 + 12) % 12;

    const currentMonthOrders = paidOrders.filter(
      (order) => new Date(order.delivery_datetime).getMonth() === selectedMonth
    );
    const prevMonthOrders = paidOrders.filter(
      (order) => new Date(order.delivery_datetime).getMonth() === prevMonth
    );

    const currentTotals = getDailyTotals(currentMonthOrders);
    const prevTotals = getDailyTotals(prevMonthOrders);

    const currMap = Object.fromEntries(
      currentTotals.map(d => [new Date(d.date).getDate(), d.total])
    );
    const prevMap = Object.fromEntries(
      prevTotals.map(d => [new Date(d.date).getDate(), d.total])
    );

    const maxDays = Math.max(
      ...currentTotals.map(d => new Date(d.date).getDate()),
      ...prevTotals.map(d => new Date(d.date).getDate())
    );

    const mergedData = Array.from({ length: maxDays }, (_, i) => {
      const day = i + 1;
      return {
        day,
        label: `${monthNames[selectedMonth]} ${day}`, // e.g. "Sep 1"
        current: currMap[day] || 0,
        previous: prevMap[day] || 0,
      };
    });

    setDailyTotals(mergedData);
  }, [monthSelected, orders]);

  return (
    <>
      <div className="h-[90%] md:h-[85%] w-full text-sm">
          <MonthSelect monthSelected={monthSelected} onChange={setMonthSelected}/>
          {dailyTotals.length != 0 ? <ResponsiveContainer className="mt-3" width="100%" height="90%">
              <AreaChart
                width="100%"
                height="100%"
                data={dailyTotals}
              margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
              }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  {monthSelected.value == 0 ? <XAxis dataKey="label" reversed/> : <XAxis dataKey="day"/> }
                  <YAxis domain={[0, 'dataMax + 100']}/>
                  <Tooltip />
                  <Area
                type="monotone"
                dataKey="current"
                stroke="#4f46e5"          // deep indigo stroke
                fill="url(#colorCurrent)" // gradient fill
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="previous"
                stroke="#f97316"          // orange stroke
                fill="url(#colorPrevious)"// gradient fill
                strokeWidth={2}
                strokeDasharray="5 5"     // dashed line for "previous"
                opacity={0.7}
              />

              {/* Define gradients */}
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              </AreaChart>
          </ResponsiveContainer> : 
          <div className="mx-4 my-2 text-stone-400 text-xl font-semibold flex items-center justify-center">
            No paid orders
            </div>}
      </div>
    </>
  )
}

