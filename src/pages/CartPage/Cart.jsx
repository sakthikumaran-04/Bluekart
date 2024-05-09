import React, { useEffect, useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import { useCartStore } from "../../store/CartStore";
function Cart() {
  const cart = useCartStore((state) => state.cart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const tempTotal = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    setTotal(tempTotal);
  }, [cart]);
  return (
    <section className="font-body flex flex-col items-center min-h-[90vh] pb-20">
      <h2 className="py-6 text-2xl text-slate-600 font-medium ">My Cart</h2>
      <CartCard />
      {cart.length ? (
        <>
          <p className="pt-10 text-xl font-medium text-slate-600">
            Total : ${total.toFixed(2)}
          </p>
          <button className="bg-blue-500 py-2 px-24 my-5 rounded-lg text-white font-medium">
            Checkout
          </button>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default Cart;
