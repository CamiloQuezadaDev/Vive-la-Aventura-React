import React, { useState , createContext } from 'react'
import { Helmet } from 'react-helmet'; 

export const HeadContext = createContext(); 

export const HeadProvider = (props) => {
    const [head, setHead] = useState({
        title: 'Vive la Aventura',
    })

return (
    <HeadContext.Provider
        value={{
            head,
            setHead
        }}
    >
        <Helmet>
            <title>{head.title}</title>
        </Helmet>
        {props.children}
    </HeadContext.Provider>
)}