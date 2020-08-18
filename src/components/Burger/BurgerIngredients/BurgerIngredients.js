import React from "react";
import classes from "./BurgerIngrediants.module.css";
import PropTypes from "prop-types";

const burgerIngrediants = (props) => {
  let ingrediants = null;
  switch (props.type) {
    case "bread-bottom":
      ingrediants = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingrediants = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingrediants = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      ingrediants = <div className={classes.Cheese}></div>;
      break;
    case "bacon":
      ingrediants = <div className={classes.Bacon}></div>;
      break;
    case "salad":
      ingrediants = <div className={classes.Salad}></div>;
      break;
    default:
      ingrediants = null;
  }
  return ingrediants;
};
burgerIngrediants.propTypes = {
  type: PropTypes.string.isRequired,
};
export default burgerIngrediants;
