import { StatsCard, StatsCardSection } from "./components/StatsCard"
import { Widgets } from "./components/Widgets"
import { MainContainer } from "@/shared/components/mainContainer"

import { GiReceiveMoney, GiPayMoney } from "react-icons/gi"
import { FaClockRotateLeft } from "react-icons/fa6"
import { useOrders } from "../orders/api/orderQueries"
import { monthOptions } from "@/shared/utils/month"
import { useEffect, useState } from "react"
import Select from "react-select"

import { MonthSelect } from "@/shared/components/monthSelect"

export const Dashboard = () => {
  const currMonth = new Date().getMonth();

  const { data: orders = [] } = useOrders();

  const [monthSelected, setMonthSelected] = useState(monthOptions[currMonth + 1]);

  const [pendingOrders, setPendingOrders] = useState({ current: 0, previous: 0 });
  const [totalEarnings, setTotalEarnings] = useState({ current: 0, previous: 0 });
  const [totalOrders, setTotalOrders] = useState({ current: 0, previous: 0 });

  useEffect(() => {
    let monthOrders = orders;
    let prevMonthOrders = [];

    if (monthSelected.value !== 0) {
      const currMonthIndex = monthSelected.value - 1; // 0–11
      const prevMonthIndex = (currMonthIndex - 1 + 12) % 12;

      monthOrders = orders.filter(
        order => new Date(order.delivery_datetime).getMonth() === currMonthIndex
      );
      prevMonthOrders = orders.filter(
        order => new Date(order.delivery_datetime).getMonth() === prevMonthIndex
      );
    }

    const total = monthOrders.filter(order => order.status == "paid").reduce((acc, curr) => acc + curr.total_amount, 0);
    const prevTotal = prevMonthOrders.filter(order => order.status == "paid").reduce((acc, curr) => acc + curr.total_amount, 0);
    setTotalEarnings({ current: total, previous: prevTotal });

    const pendingCurr = monthOrders.filter(order => order.status === "pending").length;
    const pendingPrev = prevMonthOrders.filter(order => order.status === "pending").length;
    setPendingOrders({ current: pendingCurr, previous: pendingPrev });

    const ordersCurr = monthOrders.length;
    const ordersPrev = prevMonthOrders.length;
    setTotalOrders({ current: ordersCurr, previous: ordersPrev });
  }, [monthSelected, orders]);

  console.log(pendingOrders);

  return (
    <MainContainer title={"Dashboard"}
    >
      <MonthSelect
        monthSelected={monthSelected}
        onChange={e => {
            setMonthSelected(e);
        }}
      />
      <StatsCardSection>
        <StatsCard title={"Total Earnings"} color={"green"} value={totalEarnings.current} lastValue={totalEarnings.previous} Icon={GiReceiveMoney} isCurrency={true} href={"Finances"} />
        <StatsCard title={"Total Orders"} color={"indigo"} value={totalOrders.current} lastValue={totalOrders.previous} Icon={GiPayMoney} href={"Finances"} />
        <StatsCard title={"Pending Orders"} color={"orange"} value={pendingOrders.current} lastValue={pendingOrders.previous} Icon={FaClockRotateLeft} href={"Orders"} />
      </StatsCardSection>
      <Widgets />
    </MainContainer>
  )
}
