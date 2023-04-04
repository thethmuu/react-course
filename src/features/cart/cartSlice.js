import { createSlice } from '@reduxjs/toolkit';

import books from '../../data/books';

const initialState = {
  cartItems: books,
  totalAmount: 2,
  totalPrice: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
      }
    },
  },
});

export const { clearCart, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
