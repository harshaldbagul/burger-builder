import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../hoc/Auxilary/Auxilary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} closed={this.props.modalClosed} />
        <div className={classes.Modal}>{this.props.children}</div>
      </Aux>
    );
  }
}
export default Modal;
