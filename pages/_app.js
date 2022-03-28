import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Translations Queue</title>
      </Head>
      <Component {...pageProps} />
      <NextNProgress />
    </Fragment>
  );
}

export default MyApp;
