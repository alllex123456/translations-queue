import classes from './StatementItem.module.css';

const StatementItem = (props) => {
  const { order, currency, index } = props;

  const handleOnChange = (e) => {
    props.onSelectItems(e);
  };

  return (
    <tr key={index} className={classes.item}>
      <td>
        <input
          className={classes.check}
          type="checkbox"
          value={order.id}
          onChange={handleOnChange}
        />
      </td>
      <td>{new Date(order.received).toLocaleDateString('ro')}</td>
      <td>
        {order.count} chars ({(order.count / 2000).toFixed(1)} pg.)
      </td>
      <td>{order.rate}</td>
      <td>
        {(order.count / 2000).toFixed(1) * order.rate} {currency}
      </td>
    </tr>
  );
};

export default StatementItem;
