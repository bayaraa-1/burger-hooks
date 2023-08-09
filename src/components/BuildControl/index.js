import React, { useContext } from "react";
import BurgerContext from "../../context/BurgerContext";

import css from "./style.module.css";

const BuildControl = (props) => {
  const burgerContext = useContext(BurgerContext);

  return (
    <div className={css.BuildControl}>
      <div className={css.Label}>{props.orts}</div>
      <button
        disabled={props.disabled[props.type]}
        onClick={() => burgerContext.removeIngredient(props.type)}
        className={css.Less}
      >
        Хасах
      </button>
      <button
        onClick={() => burgerContext.addIngredient(props.type)}
        className={css.More}
      >
        Нэмэх
      </button>
    </div>
  );
};

export default BuildControl;
