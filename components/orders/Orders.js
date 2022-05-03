import classes from './Orders.module.css';

import { useContext } from 'react';
import UserContext from '../../store/user-ctx';

import OrderItem from './OrderItem';

const Orders = (props) => {
  const { language } = useContext(UserContext);

  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          <td className={classes.client}>Client</td>
          <td>Volum estimat</td>
          <td className={classes.rate}>Tarif</td>
          <td>Data primirii</td>
          <td>Termen</td>
          <td>Note</td>
          <td></td>
        </tr>
      </thead>
      <tbody className={classes.body}>
        {props.orders.map((order) => (
          <OrderItem
            key={order.id}
            id={order.id}
            rate={order.rate}
            client={order.client}
            received={order.received}
            deadline={order.deadline}
            count={order.count}
            notes={order.notes}
            onCompleteOrder={props.onCompleteOrder}
            onRemoveOrder={props.onRemoveOrder}
            onEditOrder={props.onEditOrder}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
