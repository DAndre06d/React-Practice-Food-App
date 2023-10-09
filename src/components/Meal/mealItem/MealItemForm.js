import { useRef, useState } from "react";
import style from "./mealItemForm.module.css";
import Input from "../../UI/input/Input";
const MealItemForm = (props) => {
  const [formValid, setFormValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmountString = amountInputRef.current.value;
    const enteredAmount = +enteredAmountString;
    if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setFormValid(false);
      return;
    } else {
      setFormValid(true);
      props.onAddCart(enteredAmount);
    }
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1
        }}
      />
      <button>+ Add</button>
      {!formValid && <p>Please enter a valid ampunt 1-5</p>}
    </form>
  );
};
export default MealItemForm;
