import { createClient, Provider } from 'urql';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import { StateContextProvider } from 'lib/context';
import UserLayout from 'components/layouts/UserLayout';

const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContextProvider>
        <Provider value={client}>
          <Toaster />
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </Provider>
      </StateContextProvider>
    </UserProvider>
  );
}
