import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import BurgerContext from "../../context/BurgerContext";
import UserContext from "../../context/UserContext";

import css from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";

const ContactData = (props) => {
  const burgerCtx = useContext(BurgerContext);
  const userCtx = useContext(UserContext);

  const history = useHistory();

  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const dunRef = useRef();

  useEffect(() => {
    if (burgerCtx.burger.finished && !burgerCtx.burger.error) {
      history.replace("/orders");
    }

    return () => {
      // Цэвэрлэгч функц : Захиалгыг буцаагаад хоосолно. Дараачийн захиалгад бэлтгэнэ гэсэн үг.
      burgerCtx.clearBurger();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burgerCtx.burger.finished]);

  const changeName = (e) => {
    if (dunRef.current.style.color === "red") {
      dunRef.current.style.color = "green";
    } else {
      dunRef.current.style.color = "red";
    }
    setName(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const saveOrder = () => {
    const newOrder = {
      userId: userCtx.state.userId,
      orts: burgerCtx.burger.ingredients,
      dun: burgerCtx.burger.totalPrice,
      hayag: {
        name,
        city,
        street,
      },
    };

    burgerCtx.saveBurger(newOrder, userCtx.state.token);
  };

  console.log("ContactData rendered...");

  return (
    <div className={css.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: "16px" }}>
          Дүн : {burgerCtx.burger.totalPrice}₮
        </strong>
      </div>
      <div>
        {burgerCtx.burger.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${burgerCtx.burger.error}`}
      </div>
      {burgerCtx.burger.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны хот"
          />
          <Button text="ИЛГЭЭХ" btnType="Success" daragdsan={saveOrder} />
        </div>
      )}
      <Button text="TOGGLE" btnType="Success" daragdsan={burgerCtx.toggle} />
    </div>
  );
};

export default ContactData;
