import Link from 'next/link';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import styled from 'styled-components';

import { useStoreContext } from '../lib/context';

import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart } = useStoreContext();
  return (
    <NavStyled>
      <Link href='/'>Y.E.C Store</Link>
      <NavItems>
        <li onClick={() => setShowCart(true)}>
          <FiShoppingBag />
          <h3>Cart</h3>
        </li>
      </NavItems>
      {showCart ? <Cart /> : null}
    </NavStyled>
  );
};

export default Navbar;

const NavStyled = styled.nav`
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    font-weight: 700;
    color: var(--primary);
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  li {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    cursor: pointer;
  }
  h3 {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    font-weight: 700;
    pointer-events: none;
  }
`;
