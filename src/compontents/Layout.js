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

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      try {
        console.log(user.uid);
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

  console.log("Hello!");

  useEffect(() => {
    fetchUserData();
  }, [userDetails]);

  return (
    <>
      <userContext.Provider value={[userDetails, userID]}>
        <Navbar />
        <Outlet />
      </userContext.Provider>
    </>
  );
};

export default Layout;
