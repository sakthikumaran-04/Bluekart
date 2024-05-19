import React from "react";
import { Link } from "react-router-dom";

function OrdersCard({ data }) {
  const formatDate = () => {
    const date = new Date(data.date);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };
  const tempTotal = JSON.parse(data.items[0]).reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);
  console.log(tempTotal)
  return (
    <div className="text-slate-900 customShadow rounded-md p-2 my-6 m-2 border-blue-500 pb-4">
      <p className=" bg-gray-200 w-fit p-2 mb-2 rounded-xl">Order Id: <span className="text-blue-700">#{data.orderId}</span></p>
      <p className="p-2">Date: {formatDate()}</p>
      <div>
        {JSON.parse(data.items[0]).map((item) => (
          <Link to={`/allproducts/product/${item.id}`}>
            <div className="flex items-center justify-between px-8 py-8">
              <img className="w-[50px] h-[70px] object-contain" src={item.image} alt="" />
            <div>
                <p>Qty: {item.quantity}</p>
                <p>Amount: ${item.quantity*item.price}</p>
            </div> 
            </div>
            <div className="border-b-2 py-3">
                <p className="text-ellipsis line-clamp-2">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
      <p className="p-2 text-sm bg-yellow-500 text-white w-fit font-medium rounded-lg text-center">Status: InProgress</p>
      <p className="text-lg text-center">Total: ${tempTotal.toFixed(2)}</p>
      </div>
      </div>
  );
}

export default OrdersCard;
