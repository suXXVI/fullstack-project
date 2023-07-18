import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import useLocalStorage from "use-local-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useLocalStorage("userId", "");

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUserId(user["uid"]);
    });
  }, [setUserId]);

  const value = { currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
