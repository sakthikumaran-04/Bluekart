import React, { useCallback } from "react";
import { useCart } from "../../hooks/useCart hook/useCart";
import trash from "../../assets/images/trash.svg";

function CartButton(props) {
  const { addToCart, removeFromCart, cartState } = useCart();

  const addCart = useCallback(
    (obj) => {
      addToCart({ ...obj, quantity: 1 });
    },
    [addToCart]
  );

  const removeCart = useCallback(
    (obj) => {
      removeFromCart({id:obj.id,removeOne:true});
    },
    [removeFromCart]
  );

  return (
    <div className="flex gap-1 justify-center items-center border-2 rounded-lg max-sm:gap-0">
      <button
        className="bg-slate-200 w-[35px] active:bg-slate-400 active:rounded-l-lg"
        onClick={() => removeCart(props.data)}
      >
        {cartState.cart[props.data.index].quantity <= 1 ? (
          <img src={trash} alt="delete" className="h-[40px] p-2" />
        ) : (
          <p className="p-2">-</p>
        )}
      </button>
      <p className="p-2 w-[40px] text-center">
        {cartState.cart[props.data.index].quantity}
      </p>
      <button
        className="bg-slate-200 p-2 active:bg-slate-400 active:rounded-r-lg w-[35px]"
        onClick={() => addCart(props.data)}
      >
        +
      </button>
    </div>
  );
}

export default CartButton;
