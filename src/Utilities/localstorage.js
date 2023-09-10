const getStoredCart = () => {
  const storedCartString = localStorage.getItem("cart");
  if (storedCartString) {
    return JSON.parse(storedCartString);
  } else {
    return [];
  }
};

const saveCartToLS = cart => {
    const cartString = JSON.stringify(cart)
    localStorage.setItem('cart', cartString)
}

const addToLS = id => {
    const cart = getStoredCart()
    cart.push(id)
    // save to local storage
    saveCartToLS(cart)
}

const removeFromLs = id => {
    const cart = getStoredCart()

    // removing every same id
    const remaining = cart.filter(idx => idx !== id)
    saveCartToLS(remaining)

}

export {addToLS, getStoredCart, removeFromLs}