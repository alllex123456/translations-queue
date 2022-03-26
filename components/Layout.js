import { Fragment } from 'react';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Translations Queue</h1>
      </header>
      <div className={classes.body}>{props.children}</div>
    </Fragment>
  );
};

export default Layout;
