import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputEle = null;

  const inputClasses = [classes.InputElement];
  
  if (props.isTouched && props.shouldValidate && !props.isValid ) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEle = (
        <input
          className={inputClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputEle = (
        <textarea
          className={inputClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEle = (
        <select
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.displayValue}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEle = (
        <input
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEle}
    </div>
  );
};
export default input;
