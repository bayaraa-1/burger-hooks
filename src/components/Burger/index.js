import React, { useContext, useMemo } from "react";
import BurgerIngredient from "../BurgerIngredient";
import BurgerContext from "../../context/BurgerContext";
import css from "./style.module.css";

const Burger = (props) => {
  const burgerContext = useContext(BurgerContext);

  return useMemo(() => {
    const items = Object.entries(burgerContext.burger.ingredients);

    let content = [];
    // eslint-disable-next-line array-callback-return
    items.map((el) => {
      for (let i = 0; i < el[1]; i++)
        content.push(
          <BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />
        );
    });

    if (content.length === 0)
      content = <p>Хачиртай талхныхаа орцыг сонгоно уу...</p>;

    return (
      <div className={css.Burger}>
        <BurgerIngredient type="bread-top" />
        {content}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }, [burgerContext.burger.ingredients]);
};

export default Burger;
