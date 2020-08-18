import React from "react";
import classes from "./Button.module.css";
const button = (props) => {
  const buttonClasses = [classes.Button, classes[props.btnType]];
  
  return (
    <button
      disabled={props.disabled}
      className={buttonClasses.join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default button;
