import { createClient, Provider } from 'urql';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import 'styles/globals.css';
import { StateContextProvider } from 'lib/context';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import UserLayout from 'components/layouts/UserLayout';

const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContextProvider>
        <Provider value={client}>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </Provider>
      </StateContextProvider>
    </UserProvider>
  );
}
