import { useState } from "react";

function getToken() {
    return sessionStorage.getItem("AuthToken");
}

export const useToken = () => {
    const userToken = getToken();
    const [token, setToken] = useState(userToken);

    function saveToken(token) {
        sessionStorage.setItem("AuthToken", token);
        setToken(token)
    }

    function clearToken() {
        sessionStorage.removeItem("AuthToken");
        setToken(null);
    }

    return [ token, saveToken, clearToken ]
}