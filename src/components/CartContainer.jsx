import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearCart } from '../features/cart/cartSlice';
import CartItem from './CartItem';

const CartContainer = () => {
  const dispatch = useDispatch();

  const { cartItems, totalAmount, totalPrice } = useSelector(
    (store) => store.cart
  );

  if (totalAmount === 0) {
    return (
      <section>
        <h2>Your book cart</h2>
        <p>currently empty</p>
      </section>
    );
  }

  return (
    <section className='max-w-3xl mx-auto'>
      <h2>Your book cart</h2>
      <div className='flex flex-col gap-3'>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div>
        <h4>
          Total Price: <span>${totalPrice}</span>
        </h4>
      </div>
      <button
        className='btn btn-primary btn-sm'
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </section>
  );
};

export default CartContainer;
