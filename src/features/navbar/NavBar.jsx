import { Navigations } from "./components/Navigations"
import { Branding } from "./components/Branding"
import { Profile } from "./components/Profile"

export const NavBar = () => {
  return (
    <div className="sticky top-2 h-[calc(100vh-16px)] hidden md:block pl-2">
        <div className="h-[calc(88vh)] border-b border-stone-400">  
            <Branding />
            <Navigations />
        </div>
        <Profile />
    </div>
  )
}

export const MobileNavBar = () => {
  return (
    <div className='fixed w-screen h-16 p-1 bg-stone-100 border-t-2 bodred-stone-700 inset-x-0 bottom-0 z-40 md:hidden 
      rounded-tl-2xl rounded-tr-2xl
      overflow-hidden
    '>
      <Navigations />
    </div>
  )
}

