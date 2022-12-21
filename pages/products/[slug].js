import React from 'react';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import { GET_PRODUCT } from '../../graphql/query';
import styled from 'styled-components';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

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
      <img src={image.data.attributes.formats.medium.url} alt={title} />

      <ProductInfo>
        <h2>{title}</h2>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <CartButtonStyled>Add to Cart</CartButtonStyled>
      </ProductInfo>
    </ProductDetailsStyled>
  );
};

export default ProductDetails;

const ProductDetailsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  img {
    width: 40%;
  }
`;

const ProductInfo = styled.div`
  width: 40%;
  button {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: black;
      box-shadow: 1px 2px 3px #ccc;
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
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

const CartButtonStyled = styled.button`
  button {
    width: 100%;
    background: var(--primary);
    color: white;
    font-weight: 500;
  }
`;
