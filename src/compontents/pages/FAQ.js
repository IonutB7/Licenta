import React, { useEffect, useState } from "react";
import FAQSection from "../FAQSection";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./FAQ.css";

export const questionContext = React.createContext();

function FAQ() {
  const [questions, setQuestions] = useState();
  const [updateQuestion, setUpdateQuestion] = useState(false);
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
  }, [updateQuestion]);

  return (
    <>
      <ul className="questionList">
        {questions?.map((qst) => {
          if (qst.type === "Question")
            return (
              <questionContext.Provider
                value={[updateQuestion, setUpdateQuestion]}
              >
                <FAQSection
                  userID={qst.user}
                  question={qst.description}
                  itemID={qst.id}
                  answerText={qst.answer}
                ></FAQSection>
              </questionContext.Provider>
            );
          else return null;
        })}
      </ul>
    </>
  );
}

export default FAQ;
