import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import css from "./style.module.css";
import MenuItem from "../MenuItem";

const Menu = (props) => {
  const userCtx = useContext(UserContext);
  return (
    <div>
      <ul className={css.Menu}>
        {userCtx.state.userId ? (
          <>
            <MenuItem exact link="/">
              ШИНЭ ЗАХИАЛГА
            </MenuItem>
            <MenuItem link="/orders">ЗАХИАЛГАНУУД</MenuItem>
            <MenuItem link="/logout">ГАРАХ</MenuItem>
          </>
        ) : (
          <>
            <MenuItem link="/login">НЭВТРЭХ</MenuItem>
            <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
