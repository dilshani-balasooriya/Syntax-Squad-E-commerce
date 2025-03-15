import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(localStorage.getItem("role"));

    return (
        <AuthContext.Provider value={{ token, setToken, userRole, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
