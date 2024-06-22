import React, { useContext, useRef } from "react";
import "./ContactSection.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { userContext } from "./Layout";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./Button";

function ContactSection() {
  const type = useRef();
  const title = useRef();
  const description = useRef();
  const [userDetails, userID] = useContext(userContext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (
        type.current.checkValidity() &&
        title.current.checkValidity() &&
        description.current.checkValidity()
      ) {
        let formID = uuidv4();

        await setDoc(doc(db, "ContactForms", formID), {
          user: userID,
          username: userDetails.username,
          userPhoto: userDetails.profilePicture,
          type: type.current.value,
          title: title.current.value,
          description: description.current.value,
          answer: "",
        });
        alert("Message sent successfully");
      } else {
        alert("Fill all fields");
      }
    } catch (error) {
      alert("User must be logged in to submit");
    }
  };

  return (
    <div className="contactPage">
      <div className="formSection">
        <div className="banner"></div>
        <form className="contactForm">
          <h2>We would like to hear from you!</h2>
          <select ref={type}>
            <option value={"Question"}>Question</option>
            <option value={"Problem"}>Problem</option>
            <option value={"Suggesetion"}>Suggestion</option>
          </select>
          <input
            type="text"
            placeholder="Request title"
            ref={title}
            required
          ></input>
          <textarea
            type="text"
            placeholder="Request description"
            ref={description}
            required
          ></textarea>
          <Button onClick={submit}>Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
