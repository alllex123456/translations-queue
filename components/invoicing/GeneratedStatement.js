import classes from './GeneratedStatement.module.css';
import { Fragment } from 'react';

const GeneratedStatement = (props) => {
  return (
    <Fragment>
      <table className={classes.table}>
        <thead className={classes.header}>
          <tr>
            <th className={classes.client}>client name</th>
            <th>Date received</th>
            <th>Count</th>
            <th>Unit Rate/pg.</th>
            <th>Total</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>some..</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className={classes.totals}>Total units:</td>
          </tr>
          <tr>
            <td className={classes.totals}>Total price:</td>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default GeneratedStatement;
