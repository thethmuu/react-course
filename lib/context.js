import React, { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [productQty, setProductQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQty = () => setProductQty((prevState) => prevState + 1);

  const decreaseQty = () => {
    setProductQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };

  const handleOnAdd = (product, quantity) => {
    // increase total qty
    setTotalQuantity((prevValue) => prevValue + quantity);
    // increase total price
    setTotalPrice((prevValue) => prevValue + product.price * quantity);

    const existedProduct = cartItems.find((item) => item.slug === product.slug);
    if (existedProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...existedProduct,
                quantity: existedProduct.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  // remove product from cart
  const handleOnRemove = (product) => {
    // decrease total qty
    setTotalQuantity((prevValue) => prevValue - 1);
    // increase total price
    setTotalPrice((prevValue) => prevValue - product.price);

    const existedProduct = cartItems.find((item) => item.slug === product.slug);
    if (existedProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...existedProduct,
                quantity: existedProduct.quantity - 1,
              }
            : item
        )
      );
    }
  };

  const contextValue = {
    productQty,
    cartItems,
    increaseQty,
    decreaseQty,
    handleOnAdd,
    showCart,
    setShowCart,
    handleOnRemove,
    totalQuantity,
    totalPrice,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
