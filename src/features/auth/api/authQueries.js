import { useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { registerUser, loginUser } from "./authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLoginUser() {
    const navigate = useNavigate();
    const [_, saveToken] = useToken();

    return useMutation({
        mutationFn: loginUser,
        onMutate: () => {
            toast.loading("Logging in...");
        }, 
        onSuccess: (data) => {
            toast.dismiss();
            toast.success("Logged in successfully!");
            saveToken(data.access_token);
            navigate("/");
        },
        onError: (error) => {
            toast.dismiss();
            toast.error("" + error);
            console.error("Login failed ||", error.message);
        }
    });
}

export function useRegisterUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser, // takes user_data
    onMutate: () => {
            toast.loading("Signing up...");
        }, 
    onSuccess: (data) => {
        toast.dismiss();
        toast.success("Signed up successfully!");
        navigate("/login");
    },
    onError: (error) => {
        toast.dismiss();
        toast.error("" + error);
        console.error("Sign up failed || ", error);
    }
  });
}
