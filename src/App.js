import React, { useState } from "react";
import Header from "./components/Layout/Header/Header";
import Meal from "./components/Meal/Meal";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartShown, setCartShown] = useState(false);
  const showCart = () => {
    setCartShown(true);
  };
  const hideCart = () => {
    setCartShown(false);
  };
  const handleOrder = () => {
    console.log("Oredering.....");
    setCartShown(false);
  };
  return (
    <CartProvider>
      {cartShown && <Cart onClose={hideCart} onOrder={handleOrder} />}
      <Header onShow={showCart} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
