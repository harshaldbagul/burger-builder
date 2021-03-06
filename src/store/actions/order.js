import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FALILED,
    error: error,
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("./orders.json")
      .then((res) => {
        const fetchedData = Object.keys(res.data).map((key) => {
          return {
            ...res.data[key],
            id: key,
          };
        });
        dispatch(fetchOrderSuccess(fetchedData));
      })
      .catch((err) => dispatch(fetchOrderFail()));
  };
};
