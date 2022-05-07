import { Fragment, useState, useEffect } from 'react';
import Link from 'next/dist/client/link';

import classes from './StatisticsMain.module.css';

const StatisticsMain = ({ invoicingList, clients }) => {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    fetch('/api/statistics/get-current-day')
      .then((res) => res.json())
      .then((data) => {
        setStatistics(data.message);
      });
  }, []);

  console.log(statistics);

  // const proba = invoicingList.map((item, index, array) => {
  //   if (item.client === array[index].client) {
  //     console.log(item.client, array[index].client);
  //   } else {
  //     return false;
  //   }
  // });
  // console.log(proba);

  const totals = invoicingList
    .map((order) => (order.count * order.rate) / 2000)
    .reduce((acc, val) => acc + val, 0)
    .toFixed();

  // const getCurrency = (clientName) => {
  //   const client = clients.find((item) =>
  //     item.name === clientName;
  //   );

  //   return client.currency;
  // };

  const grouped = invoicingList.reduce(function (r, a) {
    r[a.client] = r[a.client] || [];
    r[a.client].push(a);
    return r;
  }, Object.create(null));

  const sortedRecentOrders = invoicingList.sort((a, b) =>
    a.deadline > b.deadline ? -1 : 1
  );

  return (
    <Fragment>
      <div className={classes.totals}>
        <div className={classes.summary}>
          <p className={classes.completed}>Finalizat astăzi:</p>
          <p>{statistics.count} caractere</p>
          <p>{(statistics.count / 2000).toFixed()} pagini</p>
          <h2>Sumă de facturat: {totals}</h2>
        </div>
        <h3>Totaluri pe client</h3>
        <ul>
          {Object.entries(grouped).map((item) => (
            <li className={classes.totalsClient} key={Math.random()}>
              <p className={classes.name}>
                <Link href={`clients/${item[0].replace(/ /g, '-')}/statement`}>
                  <a target="_blank">{item[0]}</a>
                </Link>
              </p>
              <p className={classes.amount}>
                {item[1]
                  .map((item) => (item.count * item.rate) / 2000)
                  .reduce((acc, val) => acc + val, 0)
                  .toFixed()}
                {/* {getCurrency(item[0])} */}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.orders}>
        <h3>Statistici de lucru</h3>
        <h4>Lucrări finalizate recent</h4>
        <ul>
          {sortedRecentOrders.map((item) => (
            <li className={classes.recent} key={Math.random()}>
              <p>{item.client}</p>
              <p>
                Valoare: {((item.count * item.rate) / 2000).toFixed()}{' '}
                {/* {getCurrency(item.client)} */}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default StatisticsMain;
