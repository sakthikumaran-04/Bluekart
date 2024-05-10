import React from "react";
import "./Hero.css";
import img from "../../assets/images/hero.png";
import rightArr from "../../assets/images/right-arrow.svg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
function Hero() {
  const auth = useAuthStore((state)=>state.auth);
  return (
    <>
      <section className="Hero min-h-[90svh] -z-10 gap-9 grid grid-cols-2 place-content-center max-md:grid-cols-1 max-md:grid-flow-row">
        <div className="flex-1 px-6 pb-7 flex items-center justify-center font-body font-medium max-md:order-1">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-5xl max-md:text-3xl">Hey {auth?.id? String(auth.username).charAt(0).toUpperCase()+String(auth.username).slice(1) : "There"} 👋</h2>
            <p className="text-xl max-md:text-lg">
              Get Upto 30% Off On New Arrivals
            </p>
            <Link to={"/allproducts"}>
              <button className="bg-blue-500 w-full py-2 rounded-md flex items-center justify-center">
                <p>Shop Now</p>
                <img className="p-1 w-[25px] ml-3" src={rightArr} alt="" />
              </button>
            </Link>
          </div>
        </div>
        <div className="grid place-content-center w-full">
          <img src={img} className="max-md:w-80" alt="Apple products" />
        </div>
      </section>
    </>
  );
}

export default Hero;
