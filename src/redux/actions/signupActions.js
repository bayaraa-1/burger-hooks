import axios from "axios";
// import { loginUserSuccess } from "./loginActions";

export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

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

        dispatch(signupUserSuccess(token, userId));
      })
      .catch((err) => {
        dispatch(signupUserError(err));
      });
  };
};

export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};

export const signupUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId,
  };
};
export const signupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    // Auto logout
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};

// export const autoRefreshTokenAfterMillisec = () => {
//   return function (dispatch) {
//     // Token shinechleh code
//     axios
//       .post(
//         "https://securetoken.googleapis.com/v1/token?key=AIzaSyCbf9ZF2AaP6IYIxVnEMNtGI0X_RX9zzE8",
//         {
//           grant_type: "refresh_token",
//           refresh_token: localStorage.getItem("refresh_token"),
//         }
//       )
//       .then((result) => {
//         const token = result.data.id_token;
//         const userId = result.data.user_id;
//         const expiresIn = result.data.expires_in;
//         const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
//         const refreshToken = result.data.refresh_token;

//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", userId);
//         localStorage.setItem("expireDate", expireDate);
//         localStorage.setItem("refreshToken", refreshToken);

//         dispatch(loginUserSuccess(token, userId));
//       })
//       .catch((err) => {
//         dispatch(signupUserError(err));
//       });
//   };
// };
