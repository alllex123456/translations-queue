import { Fragment } from 'react';

const StatisticsMain = ({ invoicingList, clients }) => {
  const totals = invoicingList
    .map((order) => (order.count * order.rate) / 2000)
    .reduce((acc, val) => acc + val, 0);
  const clientNames = clients.map((client) => client.name);

  const sortedClients = [];
  for (let x = 0; x <= clientNames.length; x++) {
    sortedClients.push(
      invoicingList.filter((item) => item.client === clientNames[x])
    );
  }

  console.log(sortedClients);

  return (
    <Fragment>
      <div>
        <h3>Not invoiced: {totals.toFixed()} RON</h3>
        <h3>Totals per client</h3>
      </div>
      <div>
        <h3>Work statistics</h3>
        <ul>
          {sortedClients.map((client) => (
            <li>
              <h3>{client.map((item) => item.client)}</h3>
              <p>
                Total:{' '}
                {client
                  .map((item) => (item.count * item.rate) / 2000)
                  .reduce((acc, val) => acc + val, 0)
                  .toFixed()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default StatisticsMain;
