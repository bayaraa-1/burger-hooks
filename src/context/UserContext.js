import React, { useState } from "react";
import axios from "../axios-orders";

const UserContext = React.createContext();

const initialState = {
  userId: null,
  token: null,
  saving: false,
  logginIn: false,
  firebaseError: null,
  firebaseErrorCode: null,
  expireDate: null,
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);

  const signupUser = (email, password) => {
    setState({
      ...state,
      saving: true,
    });

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbf9ZF2AaP6IYIxVnEMNtGI0X_RX9zzE8",
        data
      )
      .then((result) => {
        // Browseriin LocalStorage ruu hadgalna
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setState({
          ...state,
          saving: false,
          token,
          userId,
          firebaseError: null,
          firebaseErrorCode: null,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          token: null,
          userId: null,
          firebaseError: err.message,
          firebaseErrorCode: err.code,
        });
      });
  };

  const loginUser = (email, password) => {
    setState({ ...state, logginIn: true });

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbf9ZF2AaP6IYIxVnEMNtGI0X_RX9zzE8",
        data
      )
      .then((result) => {
        // Browseriin LocalStorage ruu hadgalna
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;

        loginUserSuccess(token, userId, expireDate, refreshToken);

        // dispatch(actions.autoRefreshTokenAfterMillisec(expiresIn * 1000));
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          firebaseError: err.message,
          firebaseErrorCode: err.code,
          userId: null,
          token: null,
          expireDate: null,
        });
      });
  };

  const loginUserSuccess = (token, userId, expireDate, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("refreshToken", refreshToken);

    setState({
      ...state,
      logginIn: false,
      firebaseError: null,
      firebaseErrorCode: null,
      userId,
      token,
      expireDate,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("refreshToken");
    setState(initialState);
  };

  // Хугацаа дуусахад автоматаар Token-оо шинэчлэх
  const autoRenewTokenAfterMillisec = (milliSec) => {
    // token shinechleh code
    axios
      .post(
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyCbf9ZF2AaP6IYIxVnEMNtGI0X_RX9zzE8",
        {
          grant_type: "refresh_token",
          refresh_token: localStorage.getItem("refreshToken"),
        }
      )
      .then((result) => {
        const token = result.data.id_token;
        const userId = result.data.user_id;
        const expiresIn = result.data.expires_in;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refresh_token;

        loginUserSuccess(token, userId, expireDate, refreshToken);
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
          expireDate: null,
        });
      });

    // avtomat logout
    setTimeout(() => {
      // logout
      autoRenewTokenAfterMillisec(3600000);
    }, milliSec);
  };

  // // Хугацаа дуусахаар автомараа Logout хийх
  // const autoLogoutAfterMillisec = (milliSec) => {
  //   // Auto logout
  //   setTimeout(() => {
  //     logout();
  //   }, milliSec);
  // };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        loginUserSuccess,
        logout,
        // autoLogoutAfterMillisec,
        autoRenewTokenAfterMillisec,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
