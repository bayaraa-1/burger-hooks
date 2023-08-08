import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

import * as actions from "../../redux/actions/signupActions";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
