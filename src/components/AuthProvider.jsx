import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import useLocalStorage from "use-local-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [email, setEmail] = useLocalStorage("email", null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setEmail(user.email);
      setUserId(user["uid"]);
    });
  }, [setUserId, setEmail]);

  const value = { currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
