import '../styles/globals.css';
import { createClient, Provider } from 'urql';
import Navbar from '../components/Navbar';
import { StateContextProvider } from '../lib/context';

const client = createClient({ url: 'http://localhost:1337/graphql' });

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Provider value={client}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </StateContextProvider>
  );
}
