import classes from './OrderItem.module.css';
import { useState, useRef } from 'react';

const OrderItem = (props) => {
  const { id, client, rate, received, deadline, count } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingFinalCount, setIsEditingFinalCount] = useState(false);
  const formattedDeadline = `${new Date(deadline).toLocaleDateString('ro', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} `;
  const formattedReceivedDate = new Date(received).toLocaleDateString('ro');

  const [clientName, setClientName] = useState(client);
  const [finalRate, setFinalRate] = useState(rate);
  const [finalCount, setFinalCount] = useState(count);
  const [finalDeadline, setFinalDeadline] = useState(formattedDeadline);

  const completeHandler = () => {
    setIsEditingFinalCount((previous) => !previous);

    if (isEditingFinalCount) {
      props.onCompleteOrder(id, finalCount, finalRate);
    }
  };

  const removeHandler = () => {
    props.onRemoveOrder(id);
  };

  const editHandler = () => {
    setIsEditing((previous) => !previous);
  };

  return (
    <tr className={classes.row}>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        ) : (
          `${clientName}`
        )}
      </td>
      <td>
        {isEditing || isEditingFinalCount ? (
          <input
            type="number"
            value={finalCount}
            onChange={(e) => setFinalCount(+e.target.value)}
          />
        ) : (
          `${finalCount}`
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={finalRate}
            onChange={(e) => setFinalRate(+e.target.value)}
          />
        ) : (
          `${finalRate}`
        )}
      </td>
      <td>{formattedReceivedDate}</td>
      <td>
        {isEditing ? (
          <input
            type="datetime-local"
            value={finalDeadline}
            onChange={(e) => setFinalDeadline(+e.target.value)}
          />
        ) : (
          `${finalDeadline}`
        )}
      </td>
      <td rowSpan="2" className={classes['flex-td']}>
        <button className={classes['btn-complete']} onClick={completeHandler}>
          Complete
        </button>
        <button className={classes['btn-complete']} onClick={editHandler}>
          {isEditing ? 'Save' : 'Change'}
        </button>
        <button className={classes['btn-complete']} onClick={removeHandler}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
