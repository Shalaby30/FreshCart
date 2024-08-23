import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setAccess(token);
      const decoded = jwtDecode(token);

    //   console.log(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ access, setAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
