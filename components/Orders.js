import classes from './Orders.module.css';

import OrderItem from './OrderItem';
import Modal from './Modal';

const Orders = (props) => {
  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          <td>Client</td>
          <td>Est. pages</td>
          <td>Date received</td>
          <td>Deadline</td>
        </tr>
      </thead>
      <tbody className={classes.body}>
        {props.orders.map((order) => (
          <OrderItem
            key={order._id}
            id={order._id}
            client={order.client}
            received={order.received}
            deadline={order.deadline}
            pages={order.pages}
            onCompleteOrder={props.onCompleteOrder}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
