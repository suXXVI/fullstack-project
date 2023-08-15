import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import useLocalStorage from 'use-local-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useLocalStorage('userId', null);
  const [email, setEmail] = useLocalStorage('email', null);
  const [profilePic, setProfilepic] = useLocalStorage('profilepic', null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setEmail(user.email);
      setProfilepic(user.photoURL);
      console.log(profilePic);
      setUserId(user['uid']);
    });
  }, [setUserId, setEmail, setProfilepic]);

  const value = { currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
