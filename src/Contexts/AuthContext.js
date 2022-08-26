import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        const result = JSON.parse(window.sessionStorage.getItem("firebase:authUser:AIzaSyDhK-_SbdErwbUvrltVQ_9Xsejgin1O4-c:[DEFAULT]"));
        if(result){
            setCurrentUser({name:result.displayName,id:result.uid});
        }
    },[])
    const value={
        currentUser,
        setCurrentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

