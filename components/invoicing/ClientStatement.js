import classes from './ClientStatement.module.css';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';

const ClientStatement = (props) => {
  const { name } = props.client;
  const [clientStatements, setClientStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/invoicing/get-invoices')
      .then((res) => res.json())
      .then((data) => {
        setClientStatements(data.message);
        setIsLoading(false);
      });
  }, []);

  const clientStatement = clientStatements.filter(
    (client) => client.client === name
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!clientStatement) {
    return <p>No orders for this client</p>;
  }

  const totalWorkload = clientStatement
    .map((order) => order.count)
    .reduce((acc, val) => acc + val, 0);

  return (
    <ul>
      <h2>Uninvoiced orders</h2>
      <li className={classes.header}>
        <h3>{name}</h3>
        <p>Date received</p>
        <p>Count</p>
        <p>Unit Rate/pg.</p>
        <p>Total</p>
      </li>
      {clientStatement.map((order) => (
        <li key={order.id} className={classes.item}>
          <p></p>
          <p>{new Date(order.received).toLocaleDateString('ro')}</p>
          <p>
            {order.count} chars ({(order.count / 2000).toFixed(1)} pg.)
          </p>
          <p>{order.rate}</p>
          <p>{(order.count / 2000).toFixed(1) * order.rate} RON</p>
        </li>
      ))}
      <li>{totalWorkload}</li>
    </ul>
  );
};

export default ClientStatement;
