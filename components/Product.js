import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Product = ({ product }) => {
  const { title, price, image, slug, width, height } = product.attributes;
  return (
    <ProductStyled className='transition rounded hover:shadow-lg'>
      <Link href={`/products/${slug}`}>
        <div>
          <Image className='transition duration-300 hover:scale-105' width="240" height="240" src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyled>
  );
};

export default Product;
const ProductStyled = styled.div`
  width: 18rem;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }
  h2 {
    padding: 0.5rem 0;
  }
`;
