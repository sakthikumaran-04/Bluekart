import React from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useOrderStore } from "../../store/OrderStore";
import OrdersCard from "../../components/OrdersCard/OrdersCard";
import noOrderImg from "../../assets/images/no_order.jpg";
import { Link } from "react-router-dom";

function Myorders() {
  const auth = useAuthStore((state) => state.auth);
  const myOrders = useOrderStore((state) => state.orders);
  console.log(myOrders);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="pt-6 text-2xl text-slate-600 font-medium ">My Orders</h2>
      <div className="md:w-[60%]">
        {myOrders.length > 0 ? (
          myOrders.map((item, i) => <OrdersCard key={i} data={item} />)
        ) : (
          <div className=" min-h-[90vh] flex flex-col items-center gap-2">
            <img src={noOrderImg} className="w-[250px] mt-10" alt="" />
            <Link to="/">
              <button className="bg-blue-500 text-white py-2 px-10 rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Myorders;
