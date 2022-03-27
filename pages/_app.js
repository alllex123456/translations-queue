import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { Fragment } from 'react/cjs/react.production.min';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <NextNProgress />
    </Fragment>
  );
}

export default MyApp;
