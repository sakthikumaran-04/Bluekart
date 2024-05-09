import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import check from "../../assets/images/tick.png";
import liked from "../../assets/images/liked.png";
import not_liked from "../../assets/images/not-liked.png";
import addCart from "../../assets/images/addToCart.png";
import trending from "../../assets/images/trending.png";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import { useCartStore } from "../../store/CartStore.js";
import { useLikeStore } from "../../store/LikeStore.js";

function Card(props) {
  const cart=useCartStore((state)=>state.cart);
  const addToCart=useCartStore((state)=>state.addToCart)
  const removeFromCart = useCartStore((state)=>state.removeFromCart);
  const like=useLikeStore((state)=>state.like);
  const addToLike=useLikeStore((state)=>state.addToLike);
  const removeFromLike=useLikeStore((state)=>state.removeFromLike);
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const handleLike = (obj) => {
    if (isLiked){
      toast.success("Removed from Wishlist!", {
        position: "top-center",
      });
      removeFromLike(obj.id)
    }
    else{
      toast.success("Added to Wishlist!", {
        position: "top-center",
      });
      addToLike(obj);
    }
    setIsLiked((prev) => !prev);
  };
  const handleCart = (obj) => {
    if (inCart){
      toast.success("Removed from Cart!", {
        position: "top-center",
      });
      removeFromCart(obj.id)
    }
    else{
      toast.success("Added to Cart!", {
        position: "top-center",
      });
      addToCart(obj);
    }
    setInCart((prev) => !prev);
  };
  useEffect(()=>{
    const foundOnCart = cart.some((item)=>item.id==props.id);
    const foundOnLike = like.some((item)=>item.id==props.id);
    if(foundOnCart) setInCart(true);
    if(foundOnLike) setIsLiked(true);
  },[])
  return (
    <section className="w-[245px] text-center font-body flex flex-col relative items-center justify-center">
      <Link to={`/allproducts/product/${props.id}`}>
        {props.label && (
          <img
            src={trending}
            className="material-symbols-outlined bg-blue-500 rounded-lg w-[35px] p-2"
            alt="trending"
          />
        )}
        <div className="flex items-center justify-center rounded-lg">
          <img
            className="object-contain h-[200px] rounded-xl m-5"
            src={props.image}
            alt={`the image of ${props.title}`}
          />
        </div>
        <div>
          <h2 className="py-1 text-lg text-slate-700 text-ellipsis w-[240px] h-[28px] whitespace-nowrap overflow-hidden">
            {props.title}
          </h2>
          <h4 className="py-1 text-sm text-slate-400 text-ellipsis text-center line-clamp-3">
            {props.description}
          </h4>
        </div>
        <div className="flex items-center justify-between m-2">
          <p className="border-2 p-1 rounded-md">In Stock</p>
          <Rating rating={props.rating} price={props.price} ratingCount={props.ratingCount}/>
        </div>
      </Link>
      <div className="flex items-center justify-between px-2 p-2 w-full">
        <h3 className="text-lg">{Number(props.price).toFixed(2)}</h3>
        <div className="flex gap-2">
          <button
            className="border-2 p-2 flex items-center justify-center rounded-lg"
            onClick={()=>handleLike({id:props.id,title:props.title,price:props.price,image:props.image})}
          >
            <img
              src={isLiked ? liked : not_liked}
              className="w-[25px]"
              alt="like"
            />
          </button>
          <button className="p-1 border-2 flex items-center justify-center rounded-lg" onClick={()=>handleCart({id:props.id,title:props.title,price:props.price,image:props.image})}>
            <img src={inCart ? check : addCart} className={`${inCart?"p-1":" "} w-[33px]" h-[33px]`} alt="add to cart" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Card;
