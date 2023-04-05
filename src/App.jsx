import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';

import { refreshTotal, getCartData } from './features/cart/cartSlice';
import { useEffect } from 'react';

export default function App() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(refreshTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  return (
    <>
      <Navbar />
      <CartContainer />
    </>
  );
}
