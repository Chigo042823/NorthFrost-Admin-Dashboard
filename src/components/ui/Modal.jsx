import React from 'react'

export const Modal = () => {
  return (
    <div className='absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-900/50 backdrop-blur-xs z-40'>
        <div className='
            fixed top-1/2 left-1/2 transform -translate-1/2
            w-[70%] h-[50%] bg-gray-50 opacity-100 z-50 rounded-xl
        '>
            Modal
        </div>
    </div>
  )
}
