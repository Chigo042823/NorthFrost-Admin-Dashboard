import { ModalHeader } from "./modalHeader"
import { OrderForm } from "./orderForm"
import { ModalButtons } from "./modalButtons"
import { useState } from "react"
import React from "react"

export const OrderModal = ({data, setFormVisible, isInsert}) => {
    return (
        <>
        <Modal title={"Order"} data={data} setFormVisible={setFormVisible} isInsert={isInsert} />
        </>
    )
}

export const Modal = ({title, setFormVisible, children}) => {
    const loadingState = useState(false);

    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
            <div className="relative rounded-xl bg-white w-[80vw] h-[88vh] opacity-100 p-4">
                {
                    loadingState[0] ? 
                    <div className="
                    absolute inset-0 z-10
                    flex flex-col justify-center items-center
                    bg-stone-200/70 backdrop-blur-xs
                    rounded-xl
                    ">
                    <svg
                        className="animate-spin h-12 w-12 text-indigo-600 mb-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        ></circle>
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    <span className="text-lg font-medium text-stone-700 animate-pulse">
                        Loading...
                    </span>
                    </div> : null
                }
                <ModalHeader title={title} setFormVisible={setFormVisible}/>

                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            loadingState, text: title});
                        })
                }
                
            </div>
        </div>
    )
}