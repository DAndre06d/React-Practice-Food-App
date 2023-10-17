import { useContext, useState } from "react";
import style from "./cart.module.css";
import MealModal from "../UI/MealModal/MealModal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./checkout/Checkout";
const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasCartItems = cartCtx.items.length > 0;
  const cartItemRemover = (id) => {
    cartCtx.removeItem(id);
  };
  const cartAddItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartitems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((data) => (
        <CartItem
          key={data.id}
          name={data.name}
          amount={data.amount}
          price={data.price}
          onRemove={cartItemRemover.bind(null, data.id)}
          onAdd={cartAddItem.bind(null, data)}
        />
      ))}
    </ul>
  );
  const orderHandler = () =>{
    setCheckout(true)
  }
  const modalAction =  <div className={style.actions}>
  <button className={style["button--alt"]} onClick={props.onClose}>
    {" "}
    Close
  </button>
  {hasCartItems && (
    <button className={style.button} onClick={orderHandler}>
      Order
    </button>
  )}
</div>
  return (
    <MealModal onClose={props.onClose}>
      {cartitems}
      <div className={style.total}>
        <span>Total Amount:</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose}/>}
      {!isCheckout && modalAction}
    </MealModal>
  );
};

export default Cart;
