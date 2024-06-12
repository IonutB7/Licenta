import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "./firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

export const userContext = React.createContext();

const Layout = () => {
  const [userDetails, setUserDetails] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);

        const fetchUserData = async () => {
          try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
              setUserID(docSnap.id);
            } else {
              alert("User document does not exist");
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        };

        // Initial fetch
        fetchUserData();

        const userListener = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            setUserID(docSnap.id);
          } else {
            alert("User document does not exist");
          }
        });

        return () => userListener();
      } else {
        setUserDetails(null);
        setUserID(null);
      }
    });
    console.log("Ceva din layout listener");
    return () => authListener();
  }, []);

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
