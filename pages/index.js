import { useQuery } from 'urql';
import styled from 'styled-components';
import { GET_PRODUCTS } from 'graphql/query';
import Product from 'components/Product';
import Link from 'next/link';
import Head from 'next/head';
import UserLayout from 'components/layouts/UserLayout';

export default function Home() {
  const [results] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      pagination: { limit: 3 },
    },
  });
  const { data, fetching, error } = results;

  const [latest] = useQuery({
    query: GET_PRODUCTS,
    variables: {
      sort: 'createdAt:desc',
      pagination: { limit: 3 },
    },
  });
  const {
    data: latestData,
    fetching: latestFetching,
    error: latestError,
  } = latest;

  const products = data?.products.data;
  const lastestProducts = latestData?.products.data;

  return (
    <main>
      <section>
        <h1 className='mb-3 font-semibold text-center'>My Store</h1>
        <ProductGallery>
          {error ? (
            <p>{error.message}</p>
          ) : !fetching ? (
            products.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))
          ) : null}
        </ProductGallery>
        <div className='flex justify-center'>
          <Link className='mt-5 btn btn-primary btn-sm' href='/products'>
            See more
          </Link>
        </div>
      </section>
      <section className='mt-5'>
        <h1 className='mb-3 font-semibold text-center'>Latest Products</h1>
        <ProductGallery>
          {latestError ? (
            <p>{error.message}</p>
          ) : !latestFetching ? (
            lastestProducts.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))
          ) : null}
        </ProductGallery>
        <div className='flex justify-center'>
          <Link className='mt-5 btn btn-primary btn-sm' href='/products'>
            See more
          </Link>
        </div>
      </section>
    </main>
  );
}

const ProductGallery = styled.div`
  /* display: grid; */
  /*  fraction  */
  /* grid-template-columns: repeat(auto-fit, minmax(12rem, 18rem));
  grid-gap: 2rem; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;
