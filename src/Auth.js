import React, { useContext, useState, useEffect } from 'react';
import { auth } from './Firebase';
import fire from './Firebase';
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  function signUp(Email, password) {
    return auth.createUserWithEmailAndPassword(Email, password);
  }

  function logIn(Email, password) {
    return auth.signInWithEmailAndPassword(Email, password);
  }
  function logOut() {
    return auth.signOut();
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  if (currentUser) {
    fire
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setEmail(currentUser.email);
        setDisplayName(doc.data().displayName);
      });
  }

  const value = {
    currentUser,
    logIn,
    signUp,
    logOut,
    email,
    displayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
