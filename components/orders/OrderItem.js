import classes from './OrderItem.module.css';

const OrderItem = (props) => {
  const { id, client, received, deadline, pages } = props;
  const formattedDeadline = `${new Date(deadline).toLocaleDateString('ro', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} `;
  const formattedReceivedDate = new Date(received).toLocaleDateString('ro');

  const completeHandler = () => {
    props.onCompleteOrder(id);
  };

  return (
    <tr className={classes.row}>
      <td>{client.toUpperCase()}</td>
      <td>{pages}</td>
      <td>{formattedReceivedDate}</td>
      <td className={classes.flex}>
        <span>{formattedDeadline}</span>
        <button className={classes['btn-complete']} onClick={completeHandler}>
          Complete
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
