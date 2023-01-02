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

  const products = data?.products.data;
  const categories = categoryData?.categories.data;
  console.log(categories);

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
          {categories
            ? categories.map((item) => (
                <li
                  className='p-2 text-sm text-center border hover:cursor-pointer'
                  onClick={() => handleCategorySelect(item.attributes.slug)}
                  key={item.attributes.slug}
                >
                  {item.attributes.name}
                </li>
              ))
            : null}
        </ul>
      </aside>
      <div className='w-full px-4'>
        <section>
          <h1 className='mb-3 font-semibold text-center'>Products</h1>
          <ProductGallery>
            {products ? (
              products.map((product) => (
                <Product key={product.attributes.slug} product={product} />
              ))
            ) : (
              <p>Loading</p>
            )}
          </ProductGallery>
        </section>
      </div>
    </main>
  );
};

export default Index;

const ProductGallery = styled.div`
  display: grid;
  /*  fraction  */
  grid-template-columns: repeat(auto-fit, minmax(16rem, 20rem));
  grid-gap: 2rem;
  justify-content: center;
`;
