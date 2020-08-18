import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Aux from "../Auxilary/Auxilary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((res) => {
        this.setState({ error: null });
        return res;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: "Network Error" });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const errorModal = this.state.error ? (
        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error}
        </Modal>
      ) : null;

      return (
        <Aux>
          {errorModal}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
