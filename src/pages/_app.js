import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  );
}

export default MyApp;
