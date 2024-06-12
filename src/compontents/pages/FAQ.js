import React, { useEffect, useState } from "react";
import FAQSection from "../FAQSection";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./FAQ.css";

function FAQ() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = onSnapshot(
      collection(db, "ContactForms"),
      (snapshot) => {
        const quest = [];
        snapshot.forEach((question) => {
          quest.push({ ...question.data(), id: question.id });
        });
        setQuestions(quest);
      }
    );

    return () => fetchQuestions();
  }, []);

  return (
    <>
      <ul className="questionList">
        {questions?.map((qst) => {
          if (qst.type === "Question")
            return (
              <FAQSection
                question={qst.description}
                itemID={qst.id}
                answerText={qst.answer}
                username={qst.username}
                userPhoto={qst.userPhoto}
              ></FAQSection>
            );
          else return null;
        })}
      </ul>
    </>
  );
}

export default FAQ;
