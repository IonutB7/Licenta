import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

export const userContext = React.createContext();

const Layout = () => {
  const [userDetails, setUserDetails] = useState();
  const [userID, setUserID] = useState();
  const [updateUserData, setUpdateUserData] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          setUserID(docSnap.id);
        } else {
          alert("User is not logged in");
        }
      } catch {}
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [updateUserData]);

  return (
    <>
      <userContext.Provider
        value={[userDetails, userID, updateUserData, setUpdateUserData]}
      >
        <Navbar />
        <Outlet />
      </userContext.Provider>
    </>
  );
};

export default Layout;
