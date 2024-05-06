import { useContext, useReducer } from "react";
import { initialstate , reducer } from "./likeReducer";
import { createContext } from "react";

const LikeContext = createContext();
export function LikeProvider({ children }) {
  const [likeState, dispatch] = useReducer(reducer, initialstate);
  const addToFav = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  const removeFromFav = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: {id:itemId} });
  };
  const resetFav = () => {
    dispatch({ type: "RESET" });
  };
  return (
    <LikeContext.Provider
      value={{ likeState, addToFav, removeFromFav, resetFav }}
    >
      {children}
    </LikeContext.Provider>
  );
}
export function useLike() {
  return useContext(LikeContext);
}
