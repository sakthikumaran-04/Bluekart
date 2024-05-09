import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cartImg from "../../assets/images/addToCart.png";
import check from "../../assets/images/tick.png";
import liked from "../../assets/images/liked.png";
import noLike from "../../assets/images/not-liked.png";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/CartStore.js";
import { useLikeStore } from "../../store/LikeStore.js";
function SingleLikeCard({ data }) {
  const like = useLikeStore((state)=>state.like);
  const cart = useCartStore((state)=>state.cart);
  const removeFromLike=useLikeStore((state)=>state.removeFromLike);
  const addToLike=useLikeStore((state)=>state.addToLike);
  const removeFromCart=useCartStore((state)=>state.removeFromCart);
  const addToCart=useCartStore((state)=>state.addToCart);
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const handleLike = (obj) => {
    if (isLiked) {
      toast.success("Removed from Wishlist!", {
        position: "top-center",
      });
      removeFromLike(obj.id)
    } else {
      toast.success("Added to Wishlist!", {
        position: "top-center",
      });
      addToLike(obj)
    }
    setIsLiked((prev) => !prev);
  };
  const handleCart = (obj) => {
    if (inCart) {
      toast.success("Removed from Cart!", {
        position: "top-center",
      });
      removeFromCart(obj.id)
    } else {
      toast.success("Added to Cart!", {
        position: "top-center",
      });
      addToCart(obj);
    }
    setInCart((prev) => !prev);
  };
  useEffect(()=>{
    const foundOnLike = like.some((item)=>item.id==data.id) ;
    const foundOnCart = cart.some((item)=>item.id==data.id) ;
    if(foundOnCart) setInCart(true);
    if(foundOnLike) setIsLiked(true)
  },[])
  return (
    <div
      key={data.id}
      className="flex font-body items-center px-5 justify-center py-5 border-b-2"
    >
      <Link to={`/allproducts/product/${data.id}`}>
        <div className="w-[70px] h-[70px] flex items-center justify-center">
          <img
            src={data.image}
            className=" object-contain w-full h-[70px]"
            alt={data.title}
          />
        </div>
      </Link>
      <div className="pl-1 grow max-w-4xl">
        <Link to={`/allproducts/product/${data.id}`} className="w-fit">
          <p className="text-slate-700 md:text-lg max-md:w-28 md:w-[350px] m-2  text-ellipsis line-clamp-3">{data.title}</p>
        </Link>
      </div>
      <div className="flex flex-row-reverse gap-2">
        <button
          className="p-2 border-2 rounded-md"
          onClick={() =>
            handleCart({
              id: data.id,
              title: data.title,
              price: data.price,
              image: data.image,
            })
          }
        >
          <img src={inCart? check:cartImg} className={`w-[28px] h-[26px]`} alt="add to cart" />
        </button>
        <button className="p-2 border-2 rounded-md" onClick={()=>handleLike({id:data.id})}>
          <img src={isLiked ? liked : noLike}  className="w-[28px]" alt="liked" />
        </button>
      </div>
    </div>
  );
}

export default SingleLikeCard;
