import React, { useEffect } from 'react';
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
      <section className='container mx-auto mt-5 text-center'>
        <h2 className='text-2xl font-bold'>Your book cart</h2>
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
      <div className='my-4'>
        <h4 className='text-right'>
          Total Price: <span>${totalPrice.toFixed(2)}</span>
        </h4>
      </div>
      <button
        className='my-4 btn btn-primary btn-sm'
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </section>
  );
};

export default CartContainer;
