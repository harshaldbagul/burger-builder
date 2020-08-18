import React from "react";
import BurgerIngrediants from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformedIngrediants = Object.keys(props.ingrediants)
    .map((igKey) => {
      return [...Array(props.ingrediants[igKey])].map((_, i) => (
        <BurgerIngrediants key={igKey + i} type={igKey} />
      ));
    })
    .reduce((prev, current) => prev.concat(current), []);

  if (transformedIngrediants.length === 0) {
    transformedIngrediants = <p>Please start adding ingrediants</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngrediants type="bread-top" />
      {transformedIngrediants}
      <BurgerIngrediants type="bread-bottom" />
    </div>
  );
};
export default burger;
