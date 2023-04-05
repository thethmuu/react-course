import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi2';

import { increase, decrease, removeItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className='shadow-xl card card-side bg-base-100'>
      <figure className='w-24'>
        <img src={img} alt={title} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{price}</h2>
        <div>
          <button onClick={() => dispatch(increase(id))}>
            <HiChevronUp />
          </button>
          <p>{amount}</p>
          <button
            onClick={() => {
              if (amount === 1) {
                dispatch(removeItem(id));
                return;
              }
              dispatch(decrease(id));
            }}
          >
            <HiChevronDown />
          </button>
        </div>
        <div className='justify-end card-actions'>
          <button
            onClick={() => dispatch(removeItem(id))}
            className='btn btn-primary'
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
