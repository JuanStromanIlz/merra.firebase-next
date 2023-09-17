import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { auth, provider } from '../firebase';
import createDoc from 'src/actions/createDoc';
import updateDoc from 'src/actions/updateDoc';
import deleteDoc from 'src/actions/deleteDoc';

const Admin = createContext();
const { Provider } = Admin;

const AdminContext = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } else {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
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

  const onNewPost = async (values) => {
    try {
      setLoading(true);
      await createDoc(values);
      setLoading(false);
      router.push(`/${values.title}`);
    } catch ({ message }) {
      console.error(message);
    }
  };

  const onUpdatePost = async (values) => {
    try {
      setLoading(true);
      await updateDoc(values);
      setLoading(false);
      router.push(`/${values.title}`);
    } catch ({ message }) {
      console.error(message);
    }
  };

  const onDeletePost = async (values) => {
    try {
      setLoading(true);
      await deleteDoc(values);
      setLoading(false);
      router.push(`/${values.title}`);
    } catch ({ message }) {
      console.error(message);
    }
  };

  useEffect(() => {
    let localUser = localStorage.getItem('user');
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
        onNewPost,
        onUpdatePost,
        onDeletePost,
        loading,
      }}
    >
      {children}
    </Provider>
  );
};

export { AdminContext as default, Admin };
