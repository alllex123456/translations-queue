import classes from './MainHeader.module.css';
import { AddressBook, ChartBar, Clock, User } from 'phosphor-react';
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
        {router.pathname === '/clients/[clientId]' &&
          router.query.clientId.replace(/-/g, ' ')}
        {router.pathname === '/clients/[clientId]/statement' &&
          'Situație - ' + router.query.clientId.replace(/-/g, ' ')}
      </h1>

      <div className={classes.navigation__top}>
        {session && (
          <p className={classes.user}>
            Utilizator autentificat: {session.user.email}
          </p>
        )}
        {!session && <Link href="/">Autentificare</Link>}
        {session && !loading && (
          <button type="button" onClick={signoutHandler}>
            Deconectare
          </button>
        )}
      </div>
      <div className={classes.navigation__bottom}>
        {session && (
          <Link href="/statistics">
            <a>
              <div className={classes['navigation__bottom-item']}>
                <p className={classes['navigation__bottom-text']}>Statistici</p>
                <ChartBar
                  className={classes['navigation__bottom-icon']}
                  size={48}
                />
              </div>
            </a>
          </Link>
        )}
        {session && (
          <Link href="/clients">
            <a>
              <div className={classes['navigation__bottom-item']}>
                <p className={classes['navigation__bottom-text']}>Clienți</p>
                <AddressBook
                  className={classes['navigation__bottom-icon']}
                  size={48}
                />
              </div>
            </a>
          </Link>
        )}
        {session && (
          <Link href="/scheduler">
            <a>
              <div className={classes['navigation__bottom-item']}>
                <p className={classes['navigation__bottom-text']}>
                  Organizator
                </p>
                <Clock
                  className={classes['navigation__bottom-icon']}
                  size={48}
                />
              </div>
            </a>
          </Link>
        )}
        {/* {session && <Link href="/invoicing">Invoicing</Link>} */}
        {session && (
          <Link href="/profile">
            <a>
              <div className={classes['navigation__bottom-item']}>
                <p className={classes['navigation__bottom-text']}>
                  Profil utilizator
                </p>
                <User
                  className={classes['navigation__bottom-icon']}
                  size={48}
                />
              </div>
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
