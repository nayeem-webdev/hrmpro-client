import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Create User
  const updateUser = (displayName, photoURL) => {
    const profileData = { displayName, photoURL };
    return updateProfile(auth.currentUser, profileData);
  };

  // Login with Password
  const loginWithPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Pop Up
  const loginWithPopUp = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logoutUser = () => {
    return signOut(auth);
  };

  // Observer- Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    updateUser,
    loginWithPassword,
    loginWithPopUp,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
