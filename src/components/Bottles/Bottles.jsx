import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import { addToLS, getStoredCart, removeFromLs } from "../../Utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

  const [bottles, setbottle] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setbottle(data));
  }, []);


  //   load cart from local storage
  useEffect(() => {
    console.log(bottles.length);
    if (bottles.length) {
      const storedCart = getStoredCart();
      //   console.log(storedCart, bottles);

      const savedCart = [];
      for (const id of storedCart) {
        console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log("save cart", savedCart);
      setCart(savedCart)
    }
  }, [bottles]);

  const handleAddToCart = bottle => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id);
  };

  const handleRemoveToCart = id => {
    // visually remove
    const remaingCart = cart.filter(bottle => bottle.id !== id)
    setCart(remaingCart)

    // remove from LS
    removeFromLs(id)
  }

  return (
    <div>
      <h2>Bottles Available: {bottles.length}</h2>
      <Cart cart={cart} handleRemoveToCart={handleRemoveToCart}></Cart>
      <div className="bottles-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
