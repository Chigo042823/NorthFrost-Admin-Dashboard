import React from 'react'
import { NavLink } from 'react-router-dom';

export const NavBarDropdownItem  = ({title, Icon, href, isSub = false}) => {

  const bgUnfocused = isSub ? "bg-neutral-200" : "bg-stone-100"
  const bgHover = isSub ? "hover:bg-neutral-300" : "hover:bg-gray-200"

  return (
    <NavLink className={({isActive}) => `rounded transition-all duration-350 space-x-1 w-full h-full p-2 flex justify-center items-center ${isActive ? "bg-white text-stone-900 shadow hover:bg-stone-50": bgUnfocused + " text-stone-500 " + bgHover}`}
      to={href}>
      {({isActive}) => (
        <>
          <Icon 
          className={`${isActive ? "text-indigo-700": ""} text-2xl`} />
          <p className='font-semibold text-lg'>{title}</p>
        </>
      )}
    </NavLink>
    )
}