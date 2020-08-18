import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const contols = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {contols.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngrediant={() => props.ingrediantAdded(ctrl.type)}
        removeIngrediant={() => props.ingrediantRemoved(ctrl.type)}
        disabled={props.disable[ctrl.type]}
      />
    ))}
    <button disabled={!props.purchasable} onClick={props.ordered} className={classes.OrderButton}>ORDER NOW</button>
  </div>
);

export default buildControls;
