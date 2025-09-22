import React from 'react'
import { AuthForm } from './components/AuthForm'
export const LoginPage = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row h-screen'> 
      <div className='flex w-full lg:w-2/5 h-[75vh] justify-center items-center px-4 py-2'>
        <AuthForm />
      </div>
      <div className='lg:w-3/5 w-full h-[25vh] lg:h-full overflow-hidden'>
        <img src="loginbg4.jpg" alt="Background" 
          className='h-full w-full lg:scale-175 lg:rotate-y-180 object-cover'/>
      </div>
    </div>
  )
}
