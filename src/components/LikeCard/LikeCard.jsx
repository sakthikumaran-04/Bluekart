import React, { useEffect, useState } from "react";
import { useLike } from "../../hooks/useLike hook/useLike.jsx";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/images/emptycart.png";
import SingleLikeCard from "../SingleLikeCard/SingleLikeCard.jsx";
function LikeCard() {
  const {likeState}=useLike();
  return (
    <>
      {likeState.liked.length > 0 ? (

          <div>
            {likeState.liked.map((item)=>{
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
