import { useContext, useReducer } from "react";
import { initialstate, reducer } from "./cartReducer";
import { createContext } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(reducer, initialstate);
  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: {id:item.id,removeOne:item.removeOne} });
  };
  const resetCart = () => {
    dispatch({ type: "RESET_CART" });
  };
  return (
    <CartContext.Provider
      value={{ cartState, addToCart, removeFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
