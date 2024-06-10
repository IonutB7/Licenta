import React, { useRef } from "react";
import "./ContactSection.css";
import { doc, setDoc } from "firebase/firestore";
// import { Button } from "./Button";
import { auth, db } from "./firebase";

function ContactSection() {
  const type = useRef();
  const title = useRef();
  const description = useRef();

  const submit = async (e) => {
    e.preventDefault();

    let formID = crypto.randomUUID();
    let currentUserID = auth.currentUser.uid;
    await setDoc(doc(db, "ContactForms", formID), {
      user: currentUserID,
      type: type.current.value,
      title: title.current.value,
      description: description.current.value,
      answer: "",
    });
    alert("Message sent successfully");
  };

  return (
    <div>
      <form className="formSection">
        <select ref={type}>
          <option value={"Question"}>Question</option>
          <option value={"Problem"}>Problem</option>
          <option value={"Suggesetion"}>Suggestion</option>
        </select>
        <input type="text" placeholder="Request title" ref={title}></input>
        <input
          type="text"
          placeholder="Request description"
          ref={description}
        ></input>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default ContactSection;
