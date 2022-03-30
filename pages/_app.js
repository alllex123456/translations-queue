import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

import Layout from '../components/Layout';
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Translations Scheduler</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <NextNProgress height={6} color="#fff" options={{ showSpinner: false }} />
    </Fragment>
  );
}

export default MyApp;
