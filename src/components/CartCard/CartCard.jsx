import React from "react";
import CartButton from "../CartButton/CartButton";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/images/emptycart.png";
import { useCartStore } from "../../store/CartStore.js";

function CartCard() {
  const cart = useCartStore((state)=>state.cart);
  return (
    <>
      {cart.length > 0 ? (
        cart.map((item, i) => {
          return (
              <div
                key={item.id}
                className="flex font-body items-center px-2 justify-center w-full border-b-2 py-6"
              >
                <Link to={`/allproducts/product/${item.id}`}>
                  <div className="w-[70px] h-[70px] flex items-center justify-center">
                    <img
                      src={item.image}
                      className="object-contain w-full h-[70px]"
                      alt={item.title}
                    />
                  </div>
                </Link>
                <div className="pl-5 w-full max-w-4xl">
                  <Link to={`/allproducts/product/${item.id}`}>
                    <p className="text-slate-900 md:text-lg px-3 text-ellipsis line-clamp-2">
                      {item.title}
                    </p>
                  </Link>
                  <div className="flex items-center pl-3 py-3 justify-between w-full">
                    <CartButton data={{ ...item, index: i }} />
                    
                  </div>
                </div>
                <p className="text-slate-700 text-center p-2">Amount:<br/>${(item.price*item.quantity).toFixed(2)}</p>
              </div>
          );
        })
      ) : (
        <div className="pt-12 flex flex-col items-center ">
          <img src={emptyCart} className="self-center w-[400px]" alt="" />
          <p className="text-center py-6 text-lg text-slate-800">
            Nothing In Your Cart
          </p>
          <Link to={`/`}>
            <button className="text-slate-50 font-medium bg-blue-500 py-2 px-6 rounded-md">
              Back To Home
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default CartCard;
