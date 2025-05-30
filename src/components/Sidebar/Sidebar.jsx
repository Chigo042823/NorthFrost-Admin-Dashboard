import { Navigations } from "./Navigations"
import { Branding } from "./Branding"
import { Profile } from "./Profile"

export const Sidebar = () => {
  return (
    <div className="sticky top-2 h-[calc(100vh-16px)]">
        <div className="h-[calc(100vh-16px-52px)] border-b border-stone-400">  {/* calc(screen height - padding - acc section height) */}
            <Branding />
            <Navigations />
        </div>
        <Profile />
    </div>
  )
}
