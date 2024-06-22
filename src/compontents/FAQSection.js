import React, { useRef } from "react";
import "./FAQSection.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function FAQSection({
  question,
  itemID,
  answerText,
  username,
  userPhoto,
  userID,
}) {
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

  async function deleteQuestion() {
    await deleteDoc(ref);
  }

  return (
    <>
      <li className="questionCard">
        <section className="userSection">
          <img alt="user" src={userPhoto} className="faqphoto" />
          <div className="userDiv">
            <span className="username">{username}</span> asks : {question}
          </div>
        </section>
        <section className="answerSection">
          <div className="answerSpan">
            <p>Answer: </p>
          </div>
          {answerText !== "" ? (
            <p className="answerText">{answerText}</p>
          ) : null}
          {answerText === "" ? (
            <>
              <input
                type="text"
                placeholder="Answer problem"
                ref={msg}
                className="answerInput"
              ></input>
              <button
                onClick={() => {
                  answerMessage(msg.current.value);
                }}
                className="answerButton"
              >
                Answer
              </button>
            </>
          ) : null}
        </section>
        {currentUser?.uid === userID ? (
          <button
            onClick={() => {
              deleteQuestion();
            }}
            className="answerButton delete"
          >
            <i class="fa-regular fa-trash-can"></i>
          </button>
        ) : null}
      </li>
    </>
  );
}

export default FAQSection;
