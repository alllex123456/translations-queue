import classes from './StatementItem.module.css';
import { useState, useEffect } from 'react';

const StatementItem = (props) => {
  const { order, currency, notes } = props;

  const handleOnChange = (e) => {
    props.onSelectItems(e);
    props.onHighlight(JSON.parse(e.target.value).id);
  };

  return (
    <tr className={classes.item}>
      <td>
        <input
          id="select"
          type="checkbox"
          value={JSON.stringify(order)}
          onChange={handleOnChange}
        />
        <span>Select</span>
      </td>
      <td>{new Date(order.received).toLocaleDateString('ro')}</td>
      <td>
        {order.count} chars ({(order.count / 2000).toFixed(2)} pg.)
      </td>
      <td>{order.rate}</td>
      <td>
        {(order.count / 2000).toFixed(2) * order.rate} {currency}
      </td>
      <td className={classes.notes}>{notes}</td>
    </tr>
  );
};

export default StatementItem;
