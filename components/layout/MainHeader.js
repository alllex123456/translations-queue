import classes from './MainHeader.module.css';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

const MainHeader = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const signoutHandler = () => {
    signOut({ redirect: false });
    router.replace('/auth');
  };

  return (
    <header className={classes.header}>
      <h1>
        {router.pathname === '/auth' && 'Autentificare'}
        {router.pathname === '/profile' && 'Profil utilizator'}
        {router.pathname === '/scheduler' && 'Organizator'}
        {router.pathname === '/clients' && 'Clienți'}
        {router.pathname === '/statistics' && 'Statistici'}
        {router.pathname === '/clients/[clientId]' && router.query.clientId}
        {router.pathname === '/clients/[clientId]/statement' &&
          'Situație - ' + router.query.clientId}
      </h1>
      <div className={classes.navigation}>
        {session && (
          <p className={classes.user}>
            Utilizator autentificat: {session.user.email}
          </p>
        )}
        {!session && <Link href="/">Autentificare</Link>}
        {session && <Link href="/statistics">Statistici</Link>}
        {session && <Link href="/clients">Clienți</Link>}
        {session && <Link href="/scheduler">Organizator</Link>}
        {/* {session && <Link href="/invoicing">Invoicing</Link>} */}
        {session && <Link href="/profile">Profil utilizator</Link>}
        {session && !loading && (
          <button type="button" onClick={signoutHandler}>
            Deconectare
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
