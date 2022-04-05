import classes from './Orders.module.css';

import OrderItem from './OrderItem';

const Orders = (props) => {
  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          <td>Client</td>
          <td>Estimated workload</td>
          <td>Rate</td>
          <td>Date received</td>
          <td>Deadline</td>
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
            onCompleteOrder={props.onCompleteOrder}
            onRemoveOrder={props.onRemoveOrder}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
