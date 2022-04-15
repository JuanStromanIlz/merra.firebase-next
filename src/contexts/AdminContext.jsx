import React, { createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const Admin = createContext();
const { Provider } = Admin;

const AdminContext = ({ children }) => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
  });

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch ({ message }) {
      console.error(message);
    }
  };

  const signOut = async () => {
    try {
      await signOutFirebase(auth);
    } catch ({ message }) {
      console.error(message);
    }
  };

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <Provider
      value={{
        user: user,
        signIn,
        signOut,
      }}
    >
      {children}
    </Provider>
  );
};

export { AdminContext as default, Admin };
