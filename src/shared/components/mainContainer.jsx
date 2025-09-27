import React from 'react'
import { Loading } from './Loading';
import { useClients } from '@/features/clients/api/clientQueries';
import { useOrders } from '@/features/orders/api/orderQueries';
import { useInvoices } from '@/features/invoices/api/invoiceQueries';
import { useUsers } from '@/features/users/api/userQueries';

export const MainContainer = ({title, children, className, noPad}) => {

  const { isLoading: isLoadingClients } = useClients();
  const { isLoading: isLoadingOrders } = useOrders();
  const { isLoading: isLoadingInvoices } = useInvoices();
  const { isLoading: isLoadingUsers } = useUsers();

  console.log(isLoadingInvoices)

  const isLoading = isLoadingClients || isLoadingOrders || isLoadingInvoices || isLoadingUsers; 

  return (
    <div className={className + " bg-white md:rounded-lg shadow" +  (!noPad ? "p-4" : "") + " space-y-1 w-full h-fit min-h-screen"}>
        {title && 
          <div className={"p-2 pb-3 mb-4 text-2xl font-bold border-b border-stone-400 flex items-center justify-between"}>
            {title} 
        </div>
        }
        {isLoading ? <Loading /> : children}
    </div>
  )
}
