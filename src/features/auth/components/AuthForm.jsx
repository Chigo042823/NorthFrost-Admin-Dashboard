import { useState } from "react";
import { BsSnow2 } from "react-icons/bs"
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./registerForm";
import { loginUser, registerUser } from "@/features/users/api/usersApi";
import { useToken } from "../hooks/useToken";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginUser, useRegisterUser } from "@/features/users/api/userQueries";

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [acctoken, saveToken] = useToken();

    const loginUser = useLoginUser();
    const registerUser = useRegisterUser();

    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        if (isLogin) {
            loginUser.mutate(data, {
                onSuccess: () => {
                    navigate("/")
                }
            })
        } else {
            registerUser.mutate(data, {
                onSuccess: () => {
                    navigate("/login")
                }
            })
        }

        
        navigate("/");
    }

    return (
        <div className="p-4 h-[90%] w-[80%]">
            <BsSnow2 size={"4em"} className="mb-7 text-indigo-500"/>
            <p className="text-4xl text-stone-900 font-bold mb-2">
                {isLogin ? "Welcome Back!" : "Welcome!"}
                </p>
            <p className="text-gray-500 mb-8">
                Please enter your details to {isLogin ? "sign in" : "sign up"}
            </p>
            {isLogin ? <LoginForm onSubmit={handleSubmit}/> : <RegisterForm onSubmit={handleSubmit}/>}
            
            <div className="mt-3 text-stone-400 text-sm">
                {isLogin ? "Dont have an account?" : "Already have an account?"}
                <Link onClick={() => setIsLogin(!isLogin)} 
                    className="ml-1 text-violet-600 underline hover:text-violet-800">
                    {isLogin ? "Sign up" : "Sign in"}
                </Link>
            </div>
        </div>
    )
}