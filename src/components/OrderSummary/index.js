import React, { useContext } from "react";
import BurgerContext from "../../context/BurgerContext";

import Button from "../General/Button";

const OrderSummary = (props) => {
  const orderCtx = useContext(BurgerContext);
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд: </p>
      <ul>
        {Object.keys(orderCtx.burger.ingredients).map((el) => (
          <li key={el}>
            {orderCtx.burger.ingredientNames[el]} :{" "}
            {orderCtx.burger.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн: {orderCtx.burger.totalPrice}₮ </strong>
      </p>
      <p>Цаашаа үргэлжлүүлэх үү?</p>
      <Button daragdsan={props.onCancel} btnType="Danger" text="ТАТГАЛЗАХ" />
      <Button
        daragdsan={props.onContinue}
        btnType="Success"
        text="ҮРГЭЛЖЛҮҮЛЭХ"
      />
    </div>
  );
};

export default OrderSummary;
