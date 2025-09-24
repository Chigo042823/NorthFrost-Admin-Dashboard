import { useState } from "react";
import { BsSnow2 } from "react-icons/bs"
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginUser, useRegisterUser } from "../api/authQueries";

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

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
                    console.log("success")
                },
                onError: e => {
                    console.log(e)
                }
            })
        } else {
            registerUser.mutate(data, {
                onSuccess: () => {
                    navigate("/login")
                }
            })
        }       
    }

    return (
        <div className="md:text-left relative md:static p-4 pt-1 md:pt-4 h-full md:h-[90%] w-[90%] md:w-[80%]">
            <div className="absolute md:static left-1/2 transform -translate-x-1/2 -translate-y-14 
                rounded-full bg-white p-3 md:p-0 z-0 md:z-10 md:mb-7 md:transform-none md:translate-0">
                <BsSnow2 className="text-6xl md:text-7xl md:static text-indigo-500"/>
            </div>
            <p className="relative text-4xl text-stone-900 font-bold mb-2 text-center md:text-left z-10 mt-6">
                {isLogin ? "Welcome Back!" : "Welcome!"}
            </p>
            <p className="text-gray-500 mb-9 md:mb-8 text-center md:text-left">
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