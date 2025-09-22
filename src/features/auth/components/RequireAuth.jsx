import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const RequireAuth = ({children}) => {

    const token = sessionStorage.getItem("AuthToken");

    if (!token) {
        return <Navigate to="/login" replace />
    }

    console.log("Has token")

    return children
}