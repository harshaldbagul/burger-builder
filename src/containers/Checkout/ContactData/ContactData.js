import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },

        value: "",
        validation: {
          required: true,
        },
        isTouched: false,
        valid: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address",
        },
        value: "",
        validation: {
          required: true,
        },
        isTouched: false,
        valid: false,
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZIP COde",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isTouched: false,
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        isTouched: false,
        valid: false,
      },
      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest ",
            },
          ],
        },
        validation: {},
        isTouched: false,
        valid: true,
        value: "fastest",
      },
    },

    isFormValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (const inputIdentifier in this.state.orderForm) {
      formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
    }
    const order = {
      ingrediants: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };
    let updatdFormElement = { ...updatedForm[inputIdentifier] };
    updatdFormElement.value = event.target.value;
    updatdFormElement.isTouched = true;

    updatdFormElement.valid = this.checkValidity(
      event.target.value,
      updatdFormElement.validation
    );

    updatedForm[inputIdentifier] = updatdFormElement;

    const isFormValid =
      Object.keys(updatedForm).filter(
        (inputIdentifier) => !updatedForm[inputIdentifier].valid
      ).length === 0;

    this.setState({
      orderForm: updatedForm,
      isFormValid: isFormValid,
    });
  };

  render() {
    const formElement = Object.keys(this.state.orderForm).map((key) => (
      <Input
        key={key}
        elementConfig={this.state.orderForm[key].elementConfig}
        elementType={this.state.orderForm[key].elementType}
        value={this.state.orderForm[key].value}
        changed={(event) => this.inputChangeHandler(event, key)}
        shouldValidate={this.state.orderForm[key].validation}
        isValid={this.state.orderForm[key].valid}
        isTouched={this.state.orderForm[key].isTouched}
      />
    ));

    const form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formElement}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Order
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingrediants,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
