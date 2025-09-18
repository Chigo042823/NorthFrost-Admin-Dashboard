import { createContext, useContext, useRef, useState } from "react";

const ModalContext = createContext({
    currentModal: null,
    title: null,
    modalData: null,
    onClick: ()=> {},
    setCurrentModal: () => {},
    setTitle: () => {},
    setModalData: () => {},
    setOnClick: () => {},
    
});

export const ModalProvider = ({children}) => {
    const [currentModal, setCurrentModal] = useState(null);
    const [title, setTitle] = useState("");
    const [modalData, setModalData] = useState({});
    const [text, setText] = useState("");
    const onClickRef = useRef(null);

    return (
        <ModalContext.Provider value={{
            currentModal, setCurrentModal, 
            title, setTitle,
            modalData, setModalData,
            text, setText,
            onClick: onClickRef.current, 
            setOnClick: (fn) => {onClickRef.current = fn}
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}