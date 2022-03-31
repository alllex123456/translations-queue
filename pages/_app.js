import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

import { Provider } from 'next-auth/client';

import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Translations Scheduler</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <NextNProgress height={6} color="#fff" options={{ showSpinner: false }} />
    </Provider>
  );
}

export default MyApp;
