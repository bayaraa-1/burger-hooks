import React, { useState, useEffect, useContext, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { BurgerStore } from "../../context/BurgerContext";
import { OrderStore } from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import Logout from "../../components/Logout";

import BurgerPage from "../BurgerPage";
import LoginPage from "../LoginPage";

// Lazy loading
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});
const ShippingPage = React.lazy(() => {
  return import("../ShippingPage");
});
const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});

const App = (props) => {
  const userCtx = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      if (expireDate > new Date()) {
        // Hugatsaa n duusaaagui token baina, avtomat login hiine
        userCtx.loginUserSuccess(token, userId, expireDate, refreshToken);

        // Token huchingui bolohod uldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa avtomataar tokenoo shineer avna
        userCtx.autoRenewTokenAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        // Token hugatsaa baival tokenoo shinechlene
        userCtx.autoRenewTokenAfterMillisec(3600000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />

      <SideBar showSidebar={showSidebar} toggleSideBar={toggleSideBar} />

      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
            {userCtx.state.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>
                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
};

export default App;
