import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngrediants();
  }

  updatePurchaseState = (ingrediants) => {
    const sum = Object.keys(ingrediants)
      .map((igKey) => ingrediants[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  continuePurchaseHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  render() {
    const disableInfo = { ...this.props.ings };
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingrediants={this.props.ings}
        price={this.props.totalPrice}
        continuePurchase={this.continuePurchaseHandler}
        cancelPurchase={this.cancelPurchaseHandler}
      />
    );

    const modal = this.state.purchasing ? (
      <Modal
        show={this.state.purchasing}
        modalClosed={this.cancelPurchaseHandler}
      >
        {orderSummary}
      </Modal>
    ) : null;

    const burger = this.props.ings ? (
      <Aux>
        <Burger ingrediants={this.props.ings} />
        <BuildControls
          ingrediantAdded={this.props.onIngrediantAdded}
          ingrediantRemoved={this.props.onIngrediantRemoved}
          disable={disableInfo}
          price={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
        />
      </Aux>
    ) : this.props.error ? (
      <p>Couldn't fetch ingrediants!</p>
    ) : (
      <Spinner />
    );

    return (
      <Aux>
        {modal}
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingrediants,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngrediantAdded: (ings) => dispatch(actions.addIngrediant(ings)),
    onIngrediantRemoved: (ings) => dispatch(actions.removeIngrediant(ings)),
    onInitIngrediants: () => dispatch(actions.initIngrediants()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
