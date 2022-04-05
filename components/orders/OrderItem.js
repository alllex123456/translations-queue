import classes from './OrderItem.module.css';
import { useState, useRef } from 'react';

const OrderItem = (props) => {
  const { id, client, received, deadline, count } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [finalCount, setFinalCount] = useState(count);
  const formattedDeadline = `${new Date(deadline).toLocaleDateString('ro', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} `;
  const formattedReceivedDate = new Date(received).toLocaleDateString('ro');

  const completeHandler = () => {
    setIsEditing((previous) => !previous);
    if (isEditing) {
      props.onCompleteOrder(id, finalCount);
    }
  };

  return (
    <tr className={classes.row}>
      <td>{client.toUpperCase()}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            placeholder="enter final count..."
            value={finalCount}
            onChange={(e) => setFinalCount(+e.target.value)}
          />
        ) : (
          `${finalCount}`
        )}
      </td>
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
