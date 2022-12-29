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
              slug: { eq: selectedCategory ? selectedCategory : null },
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

  if (fetching || categoryFetching) return <p>Loading...</p>;
  if (error || categoryError) return <p>Ugh.. {error.message}</p>;
  const products = data.products.data;
  const categories = categoryData.categories.data;
  console.log(categories);

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    reexecuteQuery({ requestPolicy: 'network-only' });
  }

  return (
    <main className='flex'>
      <Head>
        <title>All Products by Category</title>
      </Head>
      <aside className='w-1/5'>
        <ul>
          {categories.map((item) => (
            <li
              className='p-2 text-sm text-center border hover:cursor-pointer'
              onClick={() => handleCategorySelect(item.attributes.slug)}
              key={item.attributes.slug}
            >
              {item.attributes.name}
            </li>
          ))}
        </ul>
      </aside>
      <div className='px-4'>
        <section className='mt-5'>
          <h1 className='mb-3 font-semibold text-center'>Products</h1>
          <ProductGallery>
            {products.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))}
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
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 2rem;
`;
