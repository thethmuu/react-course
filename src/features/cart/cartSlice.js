import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../user/userSlice';

const API_URL =
  'https://my-json-server.typicode.com/thethmuu/data-api/products';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  isLoading: false,
};

export const getCartData = createAsyncThunk(
  'cart/getCartData',
  async (_, thunkAPI) => {
    const response = fetch(API_URL).then((res) => res.json());

    // how to use reducer function from other slice
    thunkAPI.dispatch(login());

    // how to get state from other slice
    const { user } = thunkAPI.getState();

    return response;
  }
);

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
      if (cartItem.amount > 0) {
        cartItem.amount -= 1;
      }
    },
    refreshTotal: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;

      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });

      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCart, increase, decrease, refreshTotal, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
