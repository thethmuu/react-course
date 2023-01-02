import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from 'urql';
import Product from 'components/Product';
import { GET_PRODUCTS, GET_CATEGORIES } from 'graphql/query';
import { useState } from 'react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [results, reexecuteQuery] = useQuery({
    query: GET_PRODUCTS,
    variables: selectedCategory
      ? {
          filters: {
            category: {
              slug: { eq: selectedCategory },
            },
          },
        }
      : null,
  });
  const { data, fetching, error } = results;
  const [categoryResults] = useQuery({
    query: GET_CATEGORIES,
    variables: {},
  });
  const {
    data: categoryData,
    fetching: categoryFetching,
    error: categoryError,
  } = categoryResults;

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    reexecuteQuery({ requestPolicy: 'network-only' });
  }

  return (
    <main className='container flex mx-auto'>
      <Head>
        <title>All Products by Category</title>
      </Head>
      <aside className='w-1/5'>
        <ul>
          {!categoryFetching && !categoryError ? (
            categoryData.categories.data.map((item) => (
              <li
                className='p-2 text-sm text-center border hover:cursor-pointer'
                onClick={() => handleCategorySelect(item.attributes.slug)}
                key={item.attributes.slug}
              >
                {item.attributes.name}
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </aside>
      <div className='px-4'>
        <section className='mt-5'>
          <h1 className='mb-3 font-semibold text-center'>Products</h1>
          <ProductGallery>
            {!fetching && !error ? (
              data.products.data.map((product) => (
                <Product key={product.attributes.slug} product={product} />
              ))
            ) : (
              <div>Loading</div>
            )}
          </ProductGallery>
        </section>
      </div>
    </main>
  );
};

export default Index;

const ProductGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;
