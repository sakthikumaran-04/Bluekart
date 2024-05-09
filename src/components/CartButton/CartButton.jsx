import React, { useCallback } from "react";
import trash from "../../assets/images/trash.svg";
import { useCartStore } from "../../store/CartStore";
function CartButton(props) {
   const cart = useCartStore((state)=>state.cart)
   const addToCart = useCartStore((state)=>state.addToCart);
   const removeFromCart = useCartStore((state)=>state.removeFromCart)
  return (
    <div className="flex gap-1 justify-center items-center border-2 rounded-lg max-sm:gap-0">
      <button
        className="bg-slate-200 w-[35px] active:bg-slate-400 active:rounded-l-lg"
      onClick={()=>removeFromCart(props.data.id)}
      >
        {cart[props.data.index].quantity <= 1 ? (
          <img src={trash} alt="delete" className="h-[40px] p-2" />
        ) : (
          <p className="p-2">-</p>
        )}
      </button>
      <p className="p-2 w-[40px] text-center">
        {cart[props.data.index].quantity}
      </p>
      <button
        className="bg-slate-200 p-2 active:bg-slate-400 active:rounded-r-lg w-[35px]"
        onClick={()=>{addToCart(props.data)}}
      >
        +
      </button>
    </div>
  );
}

export default CartButton;
