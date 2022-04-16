import classes from './ClientStatement.module.css';
import { useEffect, useState, Fragment } from 'react';
import StatementItem from './StatementItem';
import Button from '../layout/Button';

const ClientStatement = (props) => {
  const { name, currency, notes } = props.client;

  const [selectedItems, setSelectedItems] = useState([]);
  const [highlighted, setHighlighted] = useState([]);

  const [clientStatements, setClientStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/invoicing/get-statements')
      .then((res) => res.json())
      .then((data) => {
        setClientStatements(data.message);
        setIsLoading(false);
      });
  }, []);

  const clientStatement = clientStatements.filter(
    (client) => client.client === name
  );

  const highlightHandler = (id) => {
    const highlightedList = [...highlighted];
    clientStatement.map((order) => {
      if (order.id === id) {
        highlightedList = [...highlighted, id];
      } else {
        highlightedList.splice(highlighted.indexOf(id), 1);
      }
      setHighlighted(highlightedList);
    });
  };

  const selectAllHandler = (e) => {
    if (e.target.checked) {
      setSelectedItems(clientStatement.map((order) => order));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectedItems = (e) => {
    let updatedList = [...selectedItems];
    if (e.target.checked) {
      updatedList = [...selectedItems, JSON.parse(e.target.value)];
    } else {
      updatedList.splice(selectedItems.indexOf(e.target.value), 1);
    }
    setSelectedItems(updatedList);
  };

  const removeHandler = () => {
    setSelectedItems([]);

    const ids = selectedItems.map((item) => item.id);

    fetch('/api/invoicing/remove-statements', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setClientStatements(data.message));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!clientStatement) {
    return <p>No orders for this client</p>;
  }

  const totalWorkload = clientStatement
    .map((order) => +order.count)
    .reduce((acc, val) => acc + val, 0);
  const totalUnitPrices = clientStatement
    .map((order) => (order.rate * (order.count / 2000)).toFixed())
    .reduce((acc, val) => +acc + +val, 0);

  const totalToInvoice = selectedItems
    .map((order) => (order.rate * (order.count / 2000)).toFixed())
    .reduce((acc, val) => +acc + +val, 0);

  return (
    <Fragment>
      <table className={classes.table}>
        <thead className={classes.header}>
          <tr>
            <th className={classes.client}>
              <input type="checkbox" onChange={selectAllHandler} />
              {name}
            </th>
            <th>Date received</th>
            <th>Count</th>
            <th>Unit Rate/pg.</th>
            <th>Total</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {clientStatement.map((order) => (
            <StatementItem
              key={order.id}
              order={order}
              currency={currency}
              notes={clientStatement[0].notes}
              onSelectItems={handleSelectedItems}
              onHighlight={highlightHandler}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={classes.totals}>
              Total units: {(totalWorkload / 2000).toFixed()}
            </td>
          </tr>
          <tr>
            <td className={classes.totals}>
              Total price: {totalUnitPrices} {currency}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className={classes.summary}>
        <h3>Uninvoiced orders</h3>
        <p className={classes.toInvoice}>To invoice: {totalToInvoice}</p>
        <div className={classes.actions}>
          <Button>Invoice Selected</Button>
          <Button onClick={removeHandler}>Remove Selected</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ClientStatement;
