import React from 'react';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import { GET_PRODUCT } from '../../graphql/query';
import styled from 'styled-components';

const ProductDetails = () => {
  const { query } = useRouter();

  const [results] = useQuery({
    query: GET_PRODUCT,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Ugh.. {error.message}</p>;
  const product = data.products.data[0].attributes;
  const { title, description, image, slug } = product;

  return (
    <ProductDetailsStyled>
      <ImageWrapper>
        <img src={image.data.attributes.formats.medium.url} alt={title} />
      </ImageWrapper>
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>Minus</button>
          <p>0</p>
          <button>Plus</button>
        </Quantity>
        <CartButtonStyled>
          <button>Add to Cart</button>
        </CartButtonStyled>
      </ProductInfo>
    </ProductDetailsStyled>
  );
};

export default ProductDetails;

const ProductDetailsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ImageWrapper = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  width: 40%;
  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  p {
    color: var(--secondary);
  }
  button {
    font-size: 1rem;
    font-weight: medium;
    color: white;
    background-color: var(--primary);
    padding: 0.5em 1rem;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  button {
    border: none;
    display: flex;
    font-size: 1.5rem;
  }

  p {
    width: 1rem;
    text-align: center;
  }

  span {
    color: var(--secondary);
  }
  
  svg {
    color: #494949;
  }
`;

const CartButtonStyled = styled.div`
  display: flex;
  button {
    flex: 1;
    background-color: var(--primary);
    color: white;
    font-weight: bold;
  }
`;
