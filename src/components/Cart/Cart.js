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
  const [submitLoading, setSubmitloading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
    setSubmitloading(true)
   const response = await sendRequest({
      url: "https://react-movie-practice-2d98d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      method: "POST",
      header: {"content-type" : "application/json"},
      body: {
        user: userData,
        orderItems: cartCtx.items,
        totalAmount: totalAmount
      }
    })
    setSubmitloading(false)
    setSubmitted(true)
    cartCtx.clearItems()
  }
  const modalAction = <div className={style.actions}>
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
const mealModalContent = <>
  {cartitems}
      <div className={style.total}>
        <span>Total Amount:</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onSubmitOrder={onSubmitOrder}/>}
      {!isCheckout && modalAction}
</>
const submittingModalContent = <p>Sending order Data....</p>
const submittedModalContent = <>
  <p>Successfully sent the order!</p>
  <div className={style.actions}>
  <button className={style.button} onClick={props.onClose}>
    {" "}
    Close
  </button>
</div>
</>
  return (
    <MealModal onClose={props.onClose}>
      {!submitLoading && !submitted && mealModalContent}
      {submitLoading && submittingModalContent}
      {!submitLoading && submitted && submittedModalContent}
    </MealModal>
  );
};

export default Cart;
