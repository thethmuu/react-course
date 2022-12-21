import React, { useContext } from 'react';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import { GET_PRODUCT } from '../../graphql/query';
import styled from 'styled-components';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Image from 'next/image';
import { useStoreContext } from '../../lib/context';

const ProductDetails = () => {
  const { query } = useRouter();
  const { productQty, cartItems, increaseQty, decreaseQty, handleOnAdd } =
    useStoreContext();

  const [results] = useQuery({
    query: GET_PRODUCT,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Ugh.. {error.message}</p>;
  const product = data.products.data[0].attributes;
  const { title, description, image, slug } = product;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <ProductDetailsStyled>
      {/* for Next Image component */}
      {/* <Image
        src={url}
        alt={title}
        width={width}
        height={height}
      /> */}
      <img src={url} alt={title} />

      <ProductInfo>
        <h2>{title}</h2>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{productQty}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <CartButtonStyled onClick={() => handleOnAdd(product, productQty)}>
          Add to Cart
        </CartButtonStyled>
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
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
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
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;

  &:hover,
  &:active {
    background-color: black;
    box-shadow: 1px 2px 3px #ccc;
  }
`;
