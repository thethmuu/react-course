import { createClient, Provider } from 'urql';
import Head from 'next/head';
import 'styles/globals.css';
import { StateContextProvider } from 'lib/context';
import Navbar from 'components/Navbar';

const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Provider value={client}>
        <Head>
          <title>YEC Clothing Store</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </StateContextProvider>
  );
}
