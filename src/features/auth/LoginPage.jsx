import React from 'react'
import { AuthForm } from './components/AuthForm'
export const LoginPage = () => {
  return (
    <div className='flex h-screen'> 
      <div className='flex flex-2 justify-center items-center'>
        <AuthForm />
      </div>
      <div className='flex-3 overflow-hidden'>
        <img src="loginbg4.jpg" alt="Background" className='h-full w-full rotate-y-180 scale-175'/>
      </div>
    </div>
  )
}
