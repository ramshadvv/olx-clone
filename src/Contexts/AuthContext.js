import React, { createContext, useState } from 'react'

export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
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

