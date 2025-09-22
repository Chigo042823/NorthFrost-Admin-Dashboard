import { Branding } from "../navbar/components/Branding"
import { Profile } from "../navbar/components/Profile"

export const Header = () => {
    return (
        <div className="md:hidden h-[8vh] bg-white sticky top-0 z-20 border-b border-stone-200 flex items-center justify-between">
             <Branding />   
             <Profile />
        </div>
    )
}