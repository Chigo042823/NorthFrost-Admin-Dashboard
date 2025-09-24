import React from 'react'
import { NavLink } from 'react-router-dom';

export const SideBarLink  = ({title, Icon, href, isSub = false}) => {

  const bgUnfocused = isSub ? "bg-neutral-200" : "bg-stone-100"
  const bgHover = isSub ? "hover:bg-neutral-300" : "hover:bg-gray-200"

  return (
    <NavLink className={({isActive}) => `flex items-center justify-center md:justify-start gap-2 w-full rounded-t-xl ${isSub ? "md:rounded-none" : "md:rounded" }
      text-base px-2 py-0 md:py-1.5 *:transition-all duration-200 ${isActive ? "bg-white text-stone-900 shadow hover:bg-stone-50": bgUnfocused + " text-stone-500 " + bgHover}`}
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