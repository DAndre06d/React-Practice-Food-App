import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCart = {
  items: [],
  totalAmount: 0
};
//this will be the function that will be working once the dispatch cartState is triggered
const cartReducer = (state, action) => {
  //this checks what the action type is and if its "Add" this will work in the back gorund to add the item
  if (action.type === "Add") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const findExistIndex = state.items.findIndex(
      (data) => data.id === action.item.id
    );
    const existingItem = state.items[findExistIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[findExistIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount
    };
  }
   //this checks what the action type is and if it's "Remove" this will work in the background to delete the item that is selected 
  if (action.type === "Remove") {
    const findExistIndex = state.items.findIndex(
      (data) => data.id === action.id
    );
    const existingItem = state.items[findExistIndex];
    const updatedTotal = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((data) => data.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[findExistIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotal
    };
  }
  if(action.type === "Clear"){
    return defaultCart;
  }

  return defaultCart;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCart);
  const addItemHandler = (item) => {
    dispatchCartState({
      type: "Add",
      item: item
    });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({
      type: "Remove",
      id: id
    });
  };
  const clearItemsHandler = () =>{
    dispatchCartState({
      type: "Clear"
    })
  }
  //this is simply to initialized the context value
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItems: clearItemsHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
