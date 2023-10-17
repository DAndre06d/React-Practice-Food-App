import { useContext, useState } from "react";
import style from "./cart.module.css";
import MealModal from "../UI/MealModal/MealModal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./checkout/Checkout";
import useHttp from "../../hooks/UseHttp";
const Cart = (props) => {
  const {sendRequest} = useHttp()
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
  const onSubmitOrder = async (userData) =>{
    sendRequest({
      url: "https://react-movie-practice-2d98d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      method: "POST",
      header: {"content-type" : "app;ication/json"},
      body: {
        user: userData,
        orderItems: cartCtx.items,
        totalAmount: totalAmount
      }
    })
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
      {isCheckout && <Checkout onCancel={props.onClose} onSubmitOrder={onSubmitOrder}/>}
      {!isCheckout && modalAction}
    </MealModal>
  );
};

export default Cart;
