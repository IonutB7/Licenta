import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const BTN_STYLES = ["btn--typeOne", "btn--typeTwo"];
const BTN_SIZES = ["btn--m", "btn--l"];

export const Button = ({ children, onClick, type, btnStyle, btnSize }) => {
  const checkBtnStyle = BTN_STYLES.includes(btnStyle)
    ? btnStyle
    : BTN_STYLES[0];
  const checkBtnSize = BTN_SIZES.includes(btnSize) ? btnSize : BTN_SIZES[0];

  return (
    <Link to="sign-in" className="btn--mbl">
      <button
        className={`btn ${checkBtnStyle} ${checkBtnSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
