import classes from './OrderItem.module.css';

const OrderItem = (props) => {
  const { id, client, received, deadline, pages } = props;
  const formattedDeadline = `${new Date(deadline).toLocaleDateString(
    'ro'
  )} / Time: ${new Date(deadline).getHours()}:${new Date(
    deadline
  ).getMinutes()}`;
  const formattedReceivedDate = new Date(received).toLocaleDateString('ro');

  const completeHandler = () => {
    props.onCompleteOrder(id);
  };

  return (
    <tr className={classes.row}>
      <td>{client}</td>
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
