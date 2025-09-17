import { createContext, useContext, useState } from "react";

const AlertContext = createContext({
    isVisible: false,
    title: null,
    text: null,
    setIsVisible: () => {},
    setTitle: () => {},
    setText: () => {},
});

export const AlertProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    return (
        <AlertContext.Provider value={{
            isVisible, setIsVisible, 
            title, setTitle, 
            text, setText}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext)
}