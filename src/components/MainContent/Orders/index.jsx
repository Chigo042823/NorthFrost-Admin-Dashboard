import React, { useState } from 'react'
import { MainContainer } from '../../../shared/components/mainContainer'
import { DataTable } from "../../tables/Orders/data-table"
import { StatsCard, StatsCardSection } from "../../ui/StatsCard"

import { HiOutlineExclamation } from "react-icons/hi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsBoxSeam } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../../api/orders';

export const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"], 
    queryFn: getOrders
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  const pending = data.filter(order => order.status == "pending").length;
  const unpaid = data.filter(order => order.status == "unpaid").length;
  console.log(data)
  return (
    <MainContainer title={"Orders"}>
      <StatsCardSection>
        <StatsCard title={"Pending Orders"} color={"orange"} value={pending} lastValue={1} Icon={FaClockRotateLeft}/>
        <StatsCard title={"Unpaid Orders"} color={"red"} value={unpaid} lastValue={1} Icon={HiOutlineExclamation}/>
        <StatsCard title={"Total Orders"} color={"indigo"} value={data.length} lastValue={1} Icon={BsBoxSeam}/>
      </StatsCardSection>
      <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
        <DataTable />
      </div>
    </MainContainer>
  )
}
