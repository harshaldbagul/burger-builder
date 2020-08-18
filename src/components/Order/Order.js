import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingrediantList = Object.keys(props.ingrediants).map((igKey) => {
    return {
      name: igKey,
      quantity: props.ingrediants[igKey],
    };
  });
  const ingrediantsOutput = ingrediantList.map((ingrediant) => (
    <span key={ingrediant.name} className={classes.Ingrediants}>
      {ingrediant.name} ({ingrediant.quantity})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingrediants: {ingrediantsOutput}</p>
      <p>
        Price: <strong> {props.price} USD</strong>
      </p>
    </div>
  );
};

export default order;
