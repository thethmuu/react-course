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
    list-style: none;
  }
  svg {
    font-size: 1.5rem;
  }
`;
