import React from "react";
import addCart from "../../assets/images/addToCart.png";
import { Link } from "react-router-dom";

function CurrentOffer() {
  return (
    <section className="py-6 w-full font-body">
      <h2 className="text-slate-700 text-3xl px-6 font-medium text-center py-8">
        Exclusive
      </h2>
      <Link to={`/allproducts/product/114`}>
        <div className="text-center flex flex-col justify-center items-center">
          <img
            className="w-[280px] h-[200px] object-contain p-3"
            src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
            alt="image of ultra wide gaming monitor"
          />
          <h4 className="text-xl font-semibold py-3">QLED Gaming Monitor</h4>
          <h3 className="text-lg text-slate-600 px-4">
            Exclusive offers on ultra wide Gaming monitors
          </h3>
          <div>
            <button className="bg-blue-500 text-white py-3 px-24 rounded-lg my-5">
              Shop Now
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default CurrentOffer;
