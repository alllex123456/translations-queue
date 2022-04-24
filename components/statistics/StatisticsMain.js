import { Fragment } from 'react';
import classes from './StatisticsMain.module.css';

const StatisticsMain = ({ invoicingList, clients }) => {
  const totals = invoicingList
    .map((order) => (order.count * order.rate) / 2000)
    .reduce((acc, val) => acc + val, 0);

  const getCurrency = (clientName) => {
    const client = clients.find((item) => item.name === clientName);
    return client.currency;
  };

  const getCountCurrentDay = () => {
    const currentDate = new Date();
    const completedCount = invoicingList.map((item) => {
      if (
        new Date(item.timeCompleted).toLocaleDateString() ===
        currentDate.toLocaleDateString()
      ) {
        return item.count;
      }
    });

    return completedCount
      .map((item) => (typeof item === 'undefined' ? '' : item))
      .reduce((acc, val) => +acc + +val, 0);
  };

  const grouped = invoicingList.reduce(function (r, a) {
    r[a.client] = r[a.client] || [];
    r[a.client].push(a);
    return r;
  }, Object.create(null));

  return (
    <Fragment>
      <div className={classes.totals}>
        <h3>Not invoiced: {totals.toFixed()} RON</h3>
        <h3>Totals per client</h3>
        <ul>
          {Object.entries(grouped).map((item) => (
            <li key={Math.random()}>
              <p className={classes.name}>{item[0]}</p>
              <p className={classes.amount}>
                {item[1]
                  .map((item) => (item.count * item.rate) / 2000)
                  .reduce((acc, val) => acc + val, 0)
                  .toFixed()}{' '}
                {getCurrency(item[0])}
                {}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.orders}>
        <h3>Work statistics</h3>
        <h4>Recent completed orders</h4>
        <ul>
          {invoicingList.map((item) => (
            <li className={classes.recent} key={Math.random()}>
              <p>{item.client}</p>
              <p>Value: {(item.count * item.rate) / 2000}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>{getCountCurrentDay()} characters completed today</div>
    </Fragment>
  );
};

export default StatisticsMain;
