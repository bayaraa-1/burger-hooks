import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import UserContext from "../../context/UserContext";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";

const Login = (props) => {
  const userCtx = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };

  const login = () => {
    userCtx.loginUser(form.email, form.password);
  };

  return (
    <div className={css.Login}>
      {userCtx.state.userId && <Redirect to="/orders" />}
      <input onChange={changeEmail} type="text" placeholder="Имэйл хаяг" />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      {userCtx.state.logginIn && <Spinner />}
      {userCtx.state.firebaseError && (
        <div style={{ color: "red" }}>
          {userCtx.state.firebaseError}
          код нь :{userCtx.state.firebaseErrorCode}
        </div>
      )}
      <Button text="НЭВТРЭХ" btnType="Success" daragdsan={login} />
    </div>
  );
};

export default Login;
