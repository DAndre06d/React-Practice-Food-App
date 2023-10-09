import React, { useContext, useEffect, useState } from "react";
import style from "./headerButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

const HeaderButton = (props) => {
  const [btnClass, setBtnClass] = useState(false);
  const cartCtx = useContext(CartContext);
  // const {items} = cartCtx
  const numberItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${style.button} ${btnClass ? style.bump : ""} `;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnClass(true);
    const timer = setTimeout(() => {
      setBtnClass(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onShow}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberItems}</span>
    </button>
  );
};

export default HeaderButton;
