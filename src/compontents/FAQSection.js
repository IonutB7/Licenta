import React, { useContext, useRef, useState } from "react";
import "./FAQSection.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { questionContext } from "./pages/FAQ";

function FAQSection({ userID, question, itemID, answerText }) {
  const [user, setUser] = useState();
  const msg = useRef();
  const [updateQuestion, setUpdateQuestion] = useContext(questionContext);
  var ref = doc(db, `ContactForms/${itemID}`);

  const currentUser = auth.currentUser;
  auth.onAuthStateChanged(async () => {
    const docRef = doc(db, "Users", userID);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      alert("User is not logged in");
    }
  });

  async function answerMessage(mesaj) {
    if (currentUser) {
      if (mesaj) {
        await updateDoc(ref, { answer: mesaj });
        setUpdateQuestion(!updateQuestion);
      } else {
        alert("Mesaj gol");
      }
    } else {
      alert("You must be logged in to answer");
    }
  }

  return (
    <>
      <li className="question">
        <img alt="user" src={user?.profilePicture} />

        <p>
          {user?.username} asks : {question}
        </p>
        <div>Answer: {answerText}</div>
        {answerText === "" ? (
          <>
            <input type="text" placeholder="answer problem" ref={msg}></input>
            <button
              onClick={() => {
                answerMessage(msg.current.value);
              }}
            >
              Answer
            </button>
          </>
        ) : null}
      </li>
    </>
  );
}

export default FAQSection;
