import React from "react";
import { connect } from "react-redux";
import BurgerIngredient from "../BurgerIngredient";
import css from "./style.module.css";

import { withRouter } from "react-router-dom";

const Burger = (props) => {
  const items = Object.entries(props.orts);

  let content = [];
  // eslint-disable-next-line array-callback-return
  items.map((el) => {
    for (let i = 0; i < el[1]; i++)
      content.push(<BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />);
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
};

const mapStateToProps = (state) => {
  return {
    orts: state.burgerReducer.ingredients,
  };
};

export default connect(mapStateToProps)(withRouter(Burger));
