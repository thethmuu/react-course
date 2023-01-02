import { createClient, Provider } from 'urql';
import Head from 'next/head';
import 'styles/globals.css';
import { StateContextProvider } from 'lib/context';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Layout from 'components/Layout';

const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Provider value={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </StateContextProvider>
  );
}
