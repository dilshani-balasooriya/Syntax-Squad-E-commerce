import { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, setIsLoginOpen, isRegisterOpen, setIsRegisterOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
