import React, { useState } from 'react'
import { MainContainer } from '../MainContainer'
import { DataTable } from "../../tables/Clients/data-table"

export const Clients = () => {
  return (
    <MainContainer title={"Clients"}>
      <div className='container mx-auto px-4 py-2 shadow rounded-lg'>
        <DataTable />
      </div>
    </MainContainer>
  )
}

