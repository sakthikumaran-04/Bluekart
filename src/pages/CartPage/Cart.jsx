import React, { useEffect, useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import { useCartStore } from "../../store/CartStore";
import { loadStripe } from "@stripe/stripe-js";
function Cart() {
  const cart = useCartStore((state) => state.cart);
  const [total, setTotal] = useState(0);
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PGjTUSGxdYiwyg2XiBSlLknLT7r2DAJ53YMVE9dniv8HEHKq3OLSMVOXnJKDIGAaB3o5lO93UaB15jNFDikvkdk00y2iBNZKb");
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`http://localhost:3000/api/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();
    sessionStorage.setItem("access_token", session.token);
    console.log(session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  useEffect(() => {
    const tempTotal = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    setTotal(tempTotal);
  }, [cart]);
  return (
    <div className="grid md:grid-cols-2">
      <section className="font-body flex flex-col items-center min-h-[90vh] pb-12 md:pl-10">
        <h2 className="py-6 text-2xl text-slate-600 font-medium ">My Cart</h2>
        <CartCard />
        {cart.length ? (
          <>
            {/* <p className="pt-10 text-xl font-medium text-slate-600">
            Total : ${total.toFixed(2)}
          </p>
          <button className="bg-blue-500 py-2 px-24 my-5 rounded-lg text-white font-medium" onClick={makePayment}>
            Checkout
          </button> */}
          </>
        ) : (
          ""
        )}
      </section>
      <section className="flex flex-col items-center w-full pb-12 gap-4">
        <h2 className="py-6 text-2xl text-slate-600 font-medium text-center ">
          Cart Summary
        </h2>
        <div className="flex items-center justify-center">
          <div className="w-[90%]">
            <label className="text-slate-900 self-start" htmlFor="promo">
              Enter promo code (if any)
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                className="border-2 py-2 rounded-lg w-full"
                name="promo"
                id="promo"
              />
              <button className=" bg-blue-500 text-slate-50 py-2 px-4 rounded-lg font-medium ml-2">
                submit
              </button>
            </div>
          </div>
        </div>
        <div className="w-[70%] py-6">
          <div className="flex justify-between items-center text-slate-800">
            <p>Subtotal</p>
            <p>+ ${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-slate-800">
            <p>Shipping</p>
            <p>+ $0</p>
          </div>
          <div className="flex justify-between items-center text-slate-800 pb-2">
            <p>Discount</p>
            <p>- $0</p>
          </div>
          <div className="flex justify-between items-center text-slate-900 border-t-2 pt-2">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
        <button className="bg-blue-500 py-2 px-24 my-5 rounded-lg text-white font-medium" onClick={makePayment}>
            Checkout
          </button> 
      </section>
    </div>
  );
}

export default Cart;
