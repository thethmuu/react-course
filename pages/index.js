import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useQuery } from 'urql';
import styled from 'styled-components';
import { GET_PRODUCTS } from '../graphql/query';
import Product from '../components/Product';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [results] = useQuery({ query: GET_PRODUCTS });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Ugh.. {error.message}</p>;
  const products = data.products.data;

  return (
    <>
      <main>
        <h1>My Store</h1>
        <ProductGallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </ProductGallery>
      </main>
    </>
  );
}

const ProductGallery = styled.div`
  display: grid;
  /*  fraction  */
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 2rem;
`;
