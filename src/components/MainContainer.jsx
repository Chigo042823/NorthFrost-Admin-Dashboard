import React from 'react'
import { FaBell } from 'react-icons/fa'

export const MainContainer = ({title, children}) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 space-y-1">
        <div className="p-2 pb-3 text-2xl font-bold border-b border-stone-400 flex items-center justify-between">
            {title} 
            <button className='relative'>
              <FaBell className='rounded-full text-indigo-700 p-2 mr-2 bg-indigo-100 text-4xl 
              hover:text-indigo-900 hover:bg-indigo-200'/>
              <p className='absolute top-0 right-0 text-xs text-red-100 bg-red-500 rounded-full py-1 px-1.5'> 1 </p>
            </button>
        </div>
        {children}
    </div>
  )
}
