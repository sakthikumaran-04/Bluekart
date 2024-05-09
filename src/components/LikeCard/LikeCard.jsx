import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/images/emptycart.png";
import SingleLikeCard from "../SingleLikeCard/SingleLikeCard.jsx";
import { useLikeStore } from "../../store/LikeStore.js";
function LikeCard() {
  const like = useLikeStore((state)=>state.like)
  return (
    <>
      {like.length > 0 ? (

          <div>
            {like.map((item)=>{
              return <SingleLikeCard key={item.id} data={item} />
            })}
          </div>
      ) : (
        <div className="pt-12 flex flex-col items-center ">
          <img src={emptyCart} className="self-center w-[400px]" alt="" />
          <p className="text-center py-6 text-lg text-slate-800">
            Nothing In Your Wishlist
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

export default LikeCard;
