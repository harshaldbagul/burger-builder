import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngrediant = (name) => {
  return {
    type: actionTypes.ADD_INGREDIANT,
    ingrediantName: name,
  };
};

export const removeIngrediant = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIANT,
    ingrediantName: name,
  };
};

const setIngrediants = (ingrediants) => {debugger
  return {
    type: actionTypes.SET_INGREDIANTS,
    ingrediants: ingrediants,
  };
};

const fetchIngrediantFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIANTS_FAILED,
  };
};

export const initIngrediants = () => {
  return (dispatch) => {
    axios
      .get("/ingrediants.json")
      .then((res) => {debugger
        dispatch(setIngrediants(res.data));
      })
      .catch((err) => {debugger
        dispatch(fetchIngrediantFailed());
      });
  };
};
