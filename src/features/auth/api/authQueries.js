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
            console.error("Login failed ||", error);
        }
    });
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser, // takes user_data
    onSuccess: (data) => {
      console.log("Success: " + data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  });
}
