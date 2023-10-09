import { useContext } from "react";
import style from "./mealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.meal.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price
    });
  };
  return (
    <li className={style.meal} key={props.id}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={style.description}>{props.meal.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
