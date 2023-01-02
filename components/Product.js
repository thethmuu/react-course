import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  return (
    <ProductStyled>
      <Link href={`/products/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
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
