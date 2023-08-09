import React, { useContext } from "react";
import { Route } from "react-router-dom";
import BurgerContext from "../../context/BurgerContext";

import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import ContactData from "../../components/ContactData";
import css from "./style.module.css";

const ShippingPage = (props) => {
  const burgerCtx = useContext(BurgerContext);

  const cancelOrder = () => {
    props.history.goBack();
  };

  const showContactData = () => {
    props.history.replace("/ship/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "24px" }}>
        <strong>Таны захиалга амттай байх болно гэж найдаж байна...</strong>
      </p>
      <p style={{ fontSize: "24px" }}>
        <strong>Дүн : {burgerCtx.burger.totalPrice}₮</strong>
      </p>

      <Burger />

      <Button
        daragdsan={cancelOrder}
        btnType="Danger"
        text="ЗАХИАЛГЫГ ЦУЦЛАХ"
      />

      <Button
        daragdsan={showContactData}
        btnType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
      />

      <Route path="/ship/contact">
        <ContactData />
      </Route>
    </div>
  );
};

export default ShippingPage;
