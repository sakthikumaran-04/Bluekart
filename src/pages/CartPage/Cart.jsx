import React, { useEffect, useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import { useCart } from "../../hooks/useCart hook/useCart";
function Cart() {
  const [total, setTotal] = useState(0);
  const { cartState } = useCart();
  useEffect(() => {
    let total = 0;
    for (let i of cartState.cart) {
      total += i.price * i.quantity;
    }
    setTotal(total);
  });
  return (
    <section className="font-body flex flex-col items-center min-h-[90vh] pb-20">
      <h2 className="py-6 text-2xl text-slate-600 font-medium ">My Cart</h2>
      <CartCard />
      {cartState.cart.length > 0 && (
        <>
          <p className="pt-10 text-xl font-medium text-slate-600">
            Total : ${total.toFixed(2)}
          </p>
          <button className="bg-blue-500 py-2 px-24 my-5 rounded-lg text-white font-medium">
            Checkout
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;
