import Link from 'next/link';
import classes from './MainHeader.module.css';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <h1>Translations Queue</h1>
      <div>
        {!authCtx.isLoggedIn && <Link href="/">Log in</Link>}
        {authCtx.isLoggedIn && <Link href="/">Profile</Link>}
        {authCtx.isLoggedIn && <Link href="/">Log out</Link>}
      </div>
    </header>
  );
};

export default MainHeader;
