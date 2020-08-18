import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intialState = {
  ingrediants: null,
  totalPrice: 4,
  error: false,
};

const INGREDIANTS_PRICES = {
  cheese: 0.5,
  salad: 0.6,
  bacon: 0.4,
  meat: 1,
};

const addIngrediant = (state, action) => {
  const updatedIngrediants = updateObject(state.ingrediants, {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1,
  });

  return updateObject(state, {
    ingrediants: updatedIngrediants,
    totalPrice: state.totalPrice + INGREDIANTS_PRICES[action.ingrediantName],
  });
};

const removeIngrediant = (state, action) => {
  const updatedIngrediant = updateObject(state.ingrediants, {
    [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
  });

  return updateObject(state, {
    ingrediants: updatedIngrediant,
    totalPrice: state.totalPrice - INGREDIANTS_PRICES[action.ingrediantName],
  });
};

const setIngrediants = (state, action) => {
  return updateObject(state, {
    ingrediants: action.ingrediants,
    totalPrice: intialState.totalPrice,
    error: false,
  });
};

const fetchIngrediantsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIANT:
      return addIngrediant(state, action);

    case actionTypes.REMOVE_INGREDIANT:
      return removeIngrediant(state, action);

    case actionTypes.SET_INGREDIANTS:
      return setIngrediants(state,action);

    case actionTypes.FETCH_INGREDIANTS_FAILED:
      return fetchIngrediantsFailed(state,action);

    default:
      return state;
  }
};

export default reducer;
