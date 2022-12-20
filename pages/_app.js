import '../styles/globals.css';
import { createClient, Provider } from 'urql';

const client = createClient({ url: 'http://localhost:1337/graphql' });

export default function App({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
