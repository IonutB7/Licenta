import React, { useEffect, useState } from "react";
import FAQSection from "../FAQSection";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./FAQ.css";

function FAQ() {
  const [questions, setQuestions] = useState();

  const fetchQuestions = async () => {
    const questionsDb = await getDocs(collection(db, "ContactForms"));

    const quest = [];

    questionsDb.forEach((question) => {
      quest.push({ ...question.data(), id: question.id });
    });
    setQuestions(quest);
  };

  useEffect(() => {
    fetchQuestions();
  }, [questions]);

  return (
    <>
      <ul className="questionList">
        {questions?.map((qst) => {
          if (qst.type === "Question")
            return (
              <FAQSection
                userID={qst.user}
                question={qst.description}
                itemID={qst.id}
                answerText={qst.answer}
              ></FAQSection>
            );
          else return null;
        })}
      </ul>
    </>
  );
}

export default FAQ;
