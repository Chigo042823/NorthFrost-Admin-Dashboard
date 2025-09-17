import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
    currentModal: null,
    title: null,
    setCurrentModal: () => {},
    setTitle: () => {},
});

export const ModalProvider = ({children}) => {
    const [currentModal, setCurrentModal] = useState(null);
    const [title, setTitle] = useState("");
    return (
        <ModalContext.Provider value={{currentModal, setCurrentModal, title, setTitle}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}