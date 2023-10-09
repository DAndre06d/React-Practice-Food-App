import React from "react";
import style from "./button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} style={props.style}>
      <span></span>
      <span>{props.name}</span>
      <span></span>
    </button>
  );
};

export default Button;
