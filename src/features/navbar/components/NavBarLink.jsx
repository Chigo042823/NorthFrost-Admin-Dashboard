import React from 'react'
import { NavLink } from 'react-router-dom';

export const SideBarLink  = ({title, Icon, href}) => {

  return (
    <NavLink className={({isActive}) => `flex items-center justify-center md:justify-start gap-2 w-full rounded-t-xl md:rounded 
      text-base px-2 py-0 md:py-1.5 *:transition-all duration-200 ${isActive ? "bg-white text-stone-900 shadow": "bg-stone-100 text-stone-500 hover:bg-gray-200"}`}
      to={href}>
      {({isActive}) => (
        <>
          <Icon className={`${isActive ? "text-indigo-700": ""} text-3xl md:text-base`} />
          <div className='hidden md:block'>
            {title}
          </div>
        </>
      )}
    </NavLink>
    )
}