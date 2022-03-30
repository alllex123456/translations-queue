import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { AuthContextProvider } from '../store/auth-context';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Head>
        <title>Translations Queue</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <NextNProgress />
    </AuthContextProvider>
  );
}

export default MyApp;
