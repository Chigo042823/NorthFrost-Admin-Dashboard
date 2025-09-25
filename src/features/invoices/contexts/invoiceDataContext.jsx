import { createContext, useContext, useState } from "react"

const InvoiceDataContext = createContext({
    invoiceData: null
})

export const InvoiceDataProvider = ({children}) => {
    const [invoiceData, setInvoiceData] = useState({})
    return (
        <InvoiceDataContext.Provider value={{
            invoiceData, setInvoiceData
        }}>
            {children}
        </InvoiceDataContext.Provider>
    )
}

export const useInvoiceData = () => {
    return useContext(InvoiceDataContext);
}