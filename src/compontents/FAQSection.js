import React, { useRef } from "react";
import "./FAQSection.css";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function FAQSection({ question, itemID, answerText, username, userPhoto }) {
  const msg = useRef();
  var ref = doc(db, `ContactForms/${itemID}`);
  const currentUser = auth.currentUser;

  async function answerMessage(mesaj) {
    if (currentUser) {
      if (mesaj) {
        await updateDoc(ref, { answer: mesaj });
      } else {
        alert("Mesaj gol");
      }
    } else {
      alert("You must be logged in to answer");
    }
  }

  console.log("Hello from faqsection");
  return (
    <>
      <li className="question">
        <img alt="user" src={userPhoto} />
        <p>
          {username} asks : {question}
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
