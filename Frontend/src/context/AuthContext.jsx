import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  const removeFromSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userRole, setUserRole, removeFromSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
