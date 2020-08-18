import React from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";
const orderSummary = (props) => {
  const ingrediantsSummary = Object.keys(props.ingrediants).map((igKey, i) => (
    <ul key={i}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
      {props.ingrediants[igKey]}
    </ul>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingrediants:</p>
      <ul>{ingrediantsSummary}</ul>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continuePurchase}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default orderSummary;
