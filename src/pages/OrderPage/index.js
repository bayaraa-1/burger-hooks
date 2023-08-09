import React, { useEffect, useContext } from "react";
import OrderContext from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

import Order from "../../components/Order";
import Spinner from "../../components/General/Spinner";

const OrderPage = (props) => {
  useEffect(() => {
    orderContext.loadOrders(userContext.state.userId, userContext.state.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderContext = useContext(OrderContext);
  const userContext = useContext(UserContext);

  return (
    <div>
      {orderContext.state.loading ? (
        <Spinner />
      ) : (
        orderContext.state.orders.map((el) => (
          <Order key={el[0]} order={el[1]} />
        ))
      )}
    </div>
  );
};

export default OrderPage;
