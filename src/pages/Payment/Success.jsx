import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import tick from "../../assets/images/tick.png";
import { useOrderStore } from "../../store/OrderStore";
import { useCartStore } from "../../store/CartStore";
import { account, database } from "../../appwrite/config";
import {Query} from "appwrite";
function Success() {
  const { token } = useParams();
  const navigate = useNavigate();
  const addToOrders = useOrderStore((state)=>state.addToOrders);
  const cart = useCartStore((state)=>state.cart);
  const access_token = sessionStorage.getItem("access_token");
  const updateOrders = useOrderStore((state)=>state.updateOrders);
  const orderInit = useOrderStore((state)=>state.init);

  useEffect(() => {
    async function doFirst(){
      if (access_token != token || !access_token) {
        navigate("/");
      }
      setTimeout(()=>{
        sessionStorage.setItem("access_token"," ")
      },10000)
      console.log(cart);
      if(access_token==token){
      try {
        const email=(await account.get("current")).email;
        await orderInit(email);
        const res = await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
            Query.equal('email',email)])
        console.log(res)
        const id=res.documents[0].$id;
         await addToOrders(id,token,res.documents[0].cart);
        
    } catch (error) {
        console.log(error);
    }
      }
    }
    doFirst();
  }, []);
  return (
    <>
      {access_token==token?
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <img className=" w-16 mb-5" src={tick} />
          <p className="text-slate-900 pb-1 font-medium text-2xl">
            Payment Success
          </p>
          <p className="text-slate-700 pb-4 font-medium">
            Thanks for shopping on Bluekart!
          </p>
          <p className="pb-4 text-slate-700 font-medium">order Id : {token}</p>
          <Link to="/">
            <button className=" bg-blue-600 text-slate-50 py-2 px-5 rounded-lg">
              Back to Home
            </button>
          </Link>
        </div>:" "
      }
    </>
  );
}

export default Success;
