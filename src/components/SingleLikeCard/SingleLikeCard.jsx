import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cart from "../../assets/images/addToCart.png";
import { useCart } from "../../hooks/useCart hook/useCart.jsx";
import { useLike } from "../../hooks/useLike hook/useLike.jsx";
import check from "../../assets/images/tick.png";
import like from "../../assets/images/liked.png";
import noLike from "../../assets/images/not-liked.png";
import { Link } from "react-router-dom";
function SingleLikeCard({ data }) {
  const { addToCart, removeFromCart, cartState } = useCart();
  const { addToFav, removeFromFav, likeState } = useLike();
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const handleLike = (obj) => {
    if (isLiked) {
      toast.success("Removed from Wishlist!", {
        position: "top-center",
      });
      removeFromFav(obj.id);
    } else {
      toast.success("Added to Wishlist!", {
        position: "top-center",
      });
      addToFav(obj);
    }
    setIsLiked((prev) => !prev);
  };
  const handleCart = (obj) => {
    if (inCart) {
      toast.success("Removed from Cart!", {
        position: "top-center",
      });
      removeFromCart({id:obj.id,removeOne:false});
    } else {
      toast.success("Added to Cart!", {
        position: "top-center",
      });
      addToCart(obj);
    }
    setInCart((prev) => !prev);

  };
  const checkCart = () => {
    for (let i of cartState.cart) {
      if (data.id == i.id) {
        setInCart(true);
      }
    }
  };
  const checkLike = () => {
    for (let i of likeState.liked) {
      if (data.id == i.id) {
        setIsLiked(true);
      }
    }
  };
  useEffect(() => {
    checkCart();
    checkLike();
  }, [likeState]);
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
          <img src={inCart? check:cart} className={`w-[28px] h-[26px]`} alt="add to cart" />
        </button>
        <button className="p-2 border-2 rounded-md" onClick={()=>handleLike({id:data.id})}>
          <img src={isLiked ? like : noLike}  className="w-[28px]" alt="liked" />
        </button>
      </div>
    </div>
  );
}

export default SingleLikeCard;
