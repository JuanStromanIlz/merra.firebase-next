import React, { createContext, useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
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
  const toast = useToast();
  const toastRef = useRef();
  const [user, setUser] = useState({});

  const createNotification = async (action, title) => {
    try {
      toastRef.current = toast({
        position: 'bottom-left',
        title: 'Cargando...',
        status: 'info',
      });
      await action();
      toast.update(toastRef.current, {
        position: 'bottom-left',
        title,
        status: 'success',
      });
    } catch ({ message }) {
      toast.update(toastRef.current, {
        position: 'bottom-left',
        title: message,
        status: 'error',
      });
    }
  };

  // Auth
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
    await createNotification(() => signInWithPopup(auth, provider), 'SignIn');
  };
  const signOut = async () => {
    await createNotification(() => signOutFirebase(auth), 'SignOut');
  };

  // Post
  const onNewPost = async (values) => {
    if (user) {
      await createNotification(
        () => createDoc(values),
        'post creado con exito.'
      );
      router.push('/');
    }
  };
  const onUpdatePost = async (values) => {
    if (user) {
      await createNotification(
        () => updateDoc(values),
        'Post editado con exito.'
      );
      router.push('/');
    }
  };
  const onDeletePost = async (values) => {
    if (user) {
      await createNotification(
        () => deleteDoc(values),
        'Post elimnado con exito.'
      );
      router.push('/');
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
      }}
    >
      {children}
    </Provider>
  );
};

export { AdminContext as default, Admin };
