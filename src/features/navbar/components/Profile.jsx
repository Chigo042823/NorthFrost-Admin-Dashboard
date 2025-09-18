import { MdAccountCircle } from "react-icons/md"
import { IoExitOutline } from "react-icons/io5"

export const Profile = () => {
  return (
    <div className="w-full flex items-center justify-start p-2 gap-x-2">
        <MdAccountCircle className="text-3xl"/>
        
        <div>
            <p className="text-md font-bold">Ariel Pacheco</p>
            <p className="text-sm text-stone-500">CEO</p>
        </div>
        <button className="mr-0 ml-auto p-2.5 rounded-lg hover:bg-gray-200">
            <IoExitOutline />
        </button>
    </div>
  )
}
