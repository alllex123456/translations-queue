import classes from './ClientStatement.module.css';
import { useEffect, useState, Fragment } from 'react';
import StatementItem from './StatementItem';

const ClientStatement = (props) => {
  const { name, currency } = props.client;
  const [selectedItems, setSelectedItems] = useState([]);

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

  const selectAllHandler = (e) => {
    if (e.target.checked) {
      setSelectedItems(clientStatement.map((order) => order.id));
    } else {
      setSelectedItems([]);
    }
  };

  console.log(selectedItems);

  const handleSelectedItems = (e) => {
    let updatedList = [...selectedItems];
    if (e.target.checked) {
      updatedList = [...selectedItems, e.target.value];
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
          </tr>
        </thead>
        <tbody>
          {clientStatement.map((order, index) => (
            <StatementItem
              key={order.id}
              order={order}
              currency={currency}
              index={index}
              onSelectItems={handleSelectedItems}
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

      <div>
        <h3>Uninvoiced orders</h3>
      </div>
    </Fragment>
  );
};

export default ClientStatement;
