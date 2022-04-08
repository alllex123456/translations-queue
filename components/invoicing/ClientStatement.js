import classes from './ClientStatement.module.css';
import { useEffect, useState, Fragment } from 'react';
import StatementItem from './StatementItem';

const ClientStatement = (props) => {
  const { name, currency } = props.client;
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
          <p className={classes.select}>Select</p>
          <p className={classes.select}>&nbsp;&nbsp;all</p>
          <tr>
            <th className={classes.client}>
              <input type="checkbox" onChange={selectAllHandler} />
              {name}
            </th>
            <th>Date received</th>
            <th>Count</th>
            <th>Unit Rate/pg.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {clientStatement.map((order) => (
            <StatementItem
              key={order.id}
              order={order}
              currency={currency}
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
      </div>
    </Fragment>
  );
};

export default ClientStatement;
