import React from 'react'
import { MainContainer } from '../MainContainer'
import { DataTable } from "../../tables/Orders/data-table"
import { columns } from "../../tables/Orders/columns"
import { Modal } from '../../ui/modal'
import { StatsCard, StatsCardSection } from "../../ui/StatsCard"

import { HiOutlineExclamation } from "react-icons/hi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsBoxSeam } from 'react-icons/bs'

const data = [
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

export const Orders = () => {
  let modalVisible = false;
  let pending = data.filter(v => v.status.toLowerCase() === "pending").length;
  let unpaid = data.filter(v => v.status.toLowerCase() === "unpaid").length;

  return (
    <MainContainer title={"Orders"}>
      <StatsCardSection>
        <StatsCard title={"Pending Orders"} color={"orange"} value={pending} lastValue={1} Icon={FaClockRotateLeft}/>
        <StatsCard title={"Unpaid Orders"} color={"red"} value={unpaid} lastValue={1} Icon={HiOutlineExclamation}/>
        <StatsCard title={"Total Orders"} color={"indigo"} value={data.length} lastValue={1} Icon={BsBoxSeam}/>
      </StatsCardSection>
      {modalVisible && <Modal /> }
      <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
        <DataTable data={data} columns={columns}/>
      </div>
    </MainContainer>
  )
}
