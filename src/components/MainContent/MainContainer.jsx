import React from 'react'
import { FaBell } from 'react-icons/fa'

export const MainContainer = ({title, children}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-1 w-full h-full">
        <div className="p-2 pb-3 text-2xl font-bold border-b border-stone-400 flex items-center justify-between">
            {title} 
            <button className='relative'>
              <FaBell className='rounded-full text-indigo-700 p-2 mr-2 bg-indigo-100 text-4xl 
              hover:text-indigo-900 hover:bg-indigo-200'/>
              <p className='absolute top-0 right-1   [font-size:_0.6rem] text-stone-100 bg-red-500 rounded-full py-0.5 px-1'> 1 </p>
            </button>
        </div>
        {children}
    </div>
  )
}
