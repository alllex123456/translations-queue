import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const signoutHandler = () => {
    signOut({ redirect: false });
    router.replace('/');
  };

  return (
    <header className={classes.header}>
      <h1>Translations Scheduler</h1>
      <div className={classes.navigation}>
        {session && (
          <p className={classes.user}>Logged in as: {session.user.email}</p>
        )}
        {!session && <Link href="/">Log in</Link>}
        {session && <Link href="/profile">Profile</Link>}
        {session && (
          <button type="button" onClick={signoutHandler}>
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
