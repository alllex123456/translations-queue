import classes from './StatementItem.module.css';
import { useState, useEffect } from 'react';

const StatementItem = (props) => {
  const { order, currency, notes } = props;

  const handleOnChange = (e) => {
    props.onSelectItems(e);
    props.onHighlight(JSON.parse(e.target.value).id);
  };

  const orderPrice = ((order.count / 2000) * order.rate).toFixed(2);

  return (
    <tr className={classes.item}>
      <td>
        <input
          id="select"
          type="checkbox"
          value={JSON.stringify(order)}
          onChange={handleOnChange}
        />
        <span>Selectează</span>
      </td>
      <td>{new Date(order.received).toLocaleDateString('ro')}</td>
      <td>
        {order.count} chars ({(order.count / 2000).toFixed(2)} pg.)
      </td>
      <td>{order.rate}</td>
      <td>{orderPrice}</td>
      <td className={classes.notes}>{order.notes}</td>
    </tr>
  );
};

export default StatementItem;
