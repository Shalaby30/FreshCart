import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [access, setAccess] = useState(null);
  const [decoded2, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setAccess(token);
      const decoded = jwtDecode(token);
      setDecoded(decoded.id);
    }
  }, []);

  useEffect(() => {
    console.log("Updated decoded2:", decoded2);
  }, [decoded2]);

  return (
    <AuthContext.Provider value={{ access, setAccess, decoded2 }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
