export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartitem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToAdd.id;
  });
  if (existingCartitem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartitem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToRemove.id;
  });
  if (existingCartitem.quantity === 1) {
    console.log('------------after filter---------')
    console.log(cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id));
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  console.log({cartItemToRemove});
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
      : cartItem
  );
};
