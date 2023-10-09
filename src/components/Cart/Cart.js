import { useContext } from "react";
import style from "./cart.module.css";
import MealModal from "../UI/MealModal/MealModal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
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
  return (
    <MealModal onClose={props.onClose}>
      {cartitems}
      <div className={style.total}>
        <span>Total Amount:</span>
        <span> {totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onClose}>
          {" "}
          Close
        </button>
        {hasCartItems && (
          <button className={style.button} onClick={props.onOrder}>
            Order
          </button>
        )}
      </div>
    </MealModal>
  );
};

export default Cart;
