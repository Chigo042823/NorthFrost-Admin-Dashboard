import { MdAccountCircle } from "react-icons/md"
import { IoExitOutline } from "react-icons/io5"
import { useToken } from "@/features/auth/hooks/useToken"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/users/api/userQueries";
import { FaGear } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/dropdown-menu"

import { Button } from "@/shared/button";
import { MoreHorizontal } from "lucide-react";

import toast from "react-hot-toast";

export const Profile = () => {
  const navigate = useNavigate();
  const [token, _, clearToken] = useToken();
  const uid = jwtDecode(token).sub;

  const {data: user = {}, isLoading} = useUser(uid);

  return (
    <div className="md:w-full flex items-center justify-start p-2 md:pb-0 gap-x-2 text-right md:text-left md:border-t border-stone-400">

        {isLoading && "Loading user..."}
        
        <div>
            <p className="font-bold">{user.username}</p>
            <p className="text-xs text-stone-400">{user.role}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="mr-0 ml-auto p-2.5 rounded-lg hover:bg-gray-200">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
              toast.promise(async () => {
                  clearToken();
                  navigate("/login");
                }
                , {
                  success: "Logged out successfully!",
                  loading: "Logging out...",
                  error: "Error: could not log out"
                })
              }} >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
