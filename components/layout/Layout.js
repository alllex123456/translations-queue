import { Fragment } from 'react';
import classes from './Layout.module.css';
import MainHeader from './MainHeader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <div className={classes.body}>{props.children}</div>
    </Fragment>
  );
};

export default Layout;
