import React, { useContext, useRef } from "react";
import "./ContactSection.css";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { userContext } from "./Layout";
import { v4 as uuidv4 } from "uuid";

function ContactSection() {
  const type = useRef();
  const title = useRef();
  const description = useRef();
  const [userDetails] = useContext(userContext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      let currentUserID = auth.currentUser.uid;
      if (
        type.current.checkValidity() &&
        title.current.checkValidity() &&
        description.current.checkValidity()
      ) {
        let formID = uuidv4();

        await setDoc(doc(db, "ContactForms", formID), {
          user: currentUserID,
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
    <div>
      <form className="formSection">
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
        <input
          type="text"
          placeholder="Request description"
          ref={description}
          required
        ></input>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default ContactSection;
