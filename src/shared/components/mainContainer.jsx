import React from 'react'
import { Loading } from './Loading';
import { useClients } from '@/features/clients/api/clientQueries';
import { useOrders } from '@/features/orders/api/orderQueries';

export const MainContainer = ({title, children}) => {

  const { isLoading: isLoadingClients } = useClients();
  const { isLoading: isLoadingOrders } = useOrders();

  const isLoading = isLoadingClients || isLoadingOrders;

  return (
    <div className="bg-white md:rounded-lg shadow p-4 space-y-1 w-full h-full min-h-screen">
        {title && 
          <div className="p-2 pb-3 text-2xl font-bold border-b border-stone-400 flex items-center justify-between">
            {title} 
        </div>
        }
        {isLoading ? <Loading /> : children}
    </div>
  )
}
