import { MdAccountCircle } from "react-icons/md"
import { IoExitOutline } from "react-icons/io5"
import { useToken } from "@/features/auth/hooks/useToken"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/users/api/userQueries";

export const Profile = () => {
  const navigate = useNavigate();
  const [token, _, clearToken] = useToken();
  const uid = jwtDecode(token).sub;

  const {data: user = {}, isLoading} = useUser(uid);

  return (
    <div className="w-full flex items-center justify-start p-2 gap-x-2">
        <MdAccountCircle className="text-3xl"/>

        {isLoading && "Loading user..."}
        
        <div>
            <p className="text-lg/tight font-bold">{user.username}</p>
            <p className="text-sm/tight text-stone-400">{user.role}</p>
        </div>
        <button onClick={() => {
          clearToken();
          navigate("/login");
          }} className="mr-0 ml-auto p-2.5 rounded-lg hover:bg-gray-200">
            <IoExitOutline />
        </button>
    </div>
  )
}
