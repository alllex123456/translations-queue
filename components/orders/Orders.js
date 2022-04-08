import classes from './Orders.module.css';

import OrderItem from './OrderItem';

const Orders = (props) => {
  return (
    <table className={classes.table}>
      <thead className={classes.head}>
        <tr>
          <td className={classes.client}>Client</td>
          <td>Estimated workload</td>
          <td className={classes.rate}>Rate</td>
          <td>Date received</td>
          <td>Deadline</td>
          <td>Notes</td>
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
