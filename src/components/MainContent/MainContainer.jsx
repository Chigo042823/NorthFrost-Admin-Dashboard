import React from 'react'
import { FaBell } from 'react-icons/fa'

export const MainContainer = ({title, children}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-1 w-full h-full">
        <div className="p-2 pb-3 text-2xl font-bold border-b border-stone-400 flex items-center justify-between">
            {title} 
        </div>
        {children}
    </div>
  )
}
