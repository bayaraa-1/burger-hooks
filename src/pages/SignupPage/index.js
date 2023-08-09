import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import UserContext from "../../context/UserContext";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";

const Signup = (props) => {
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const signup = () => {
    if (password1 === password2) {
      userCtx.signupUser(email, password1);
    } else {
      setError("Нууц үгнүүд хоорондоо таарахгүй байна!");
    }
  };

  return (
    <div className={css.Signup}>
      {userCtx.state.userId && <Redirect to="/" />}

      <h1>Бүртгэлийн форм</h1>
      <div>Та өөрийн мэдээллээ оруулна уу</div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Имэйл хаяг"
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        type="password"
        placeholder="Нууц үгээ оруулна уу"
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        type="password"
        placeholder="Нууц үгээ давтан оруулна уу"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}

      {userCtx.state.firebaseError && (
        <div style={{ color: "red" }}>{userCtx.state.firebaseError}</div>
      )}

      {userCtx.state.saving && <Spinner />}

      <Button text="БҮРТГҮҮЛЭХ" btnType="Success" daragdsan={signup} />
    </div>
  );
};

export default Signup;
