import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import loading from "../../assets/images/loading.gif";
import liked from "../../assets/images/liked.png";
import not_liked from "../../assets/images/not-liked.png";
import Similarproducts from "../../components/Similarproducts/Similarproducts";
import { toast } from "react-toastify";
import delivery from "../../assets/images/delivery.png";
import award from "../../assets/images/award.png";
import payOnDelivery from "../../assets/images/cash.png";
import { useCartStore } from "../../store/CartStore";
import { useLikeStore } from "../../store/LikeStore";
import { loadStripe } from "@stripe/stripe-js";
function Singleproduct() {
  const cart = useCartStore((state)=>state.cart);
  const like = useLikeStore((state)=>state.like);
  const addToCart=useCartStore((state)=>state.addToCart);
  const removeFromCart=useCartStore((state)=>state.removeFromCart);
  const addToLike=useLikeStore((state)=>state.addToLike);
  const removeFromLike=useLikeStore((state)=>state.removeFromLike);
  const [isLoading, setisLoading] = useState(false);
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productCategory, setProductCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setdate] = useState(
    new Date().setDate(new Date().getDate() + 2)
  );
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const handleBuyNow = (obj)=>{
    if(!inCart)
      addToCart(obj);
  }
  const fetchProduct = async () => {
    setisLoading(true);
    const api=import.meta.env.VITE_API;
    const response = await fetch(
      `${api}/api/products/${id}`
    );
    const data = await response.json();
    setRating(data.rating);
    setProductCategory(data.category);
    setProduct(data[0]);
    console.log(data[0])
    setisLoading(false);
  };
  const handleLike = (obj) => {
    if (isLiked) {
      toast.success("Removed from Wishlist!", {
        position: "top-center",
      });
      removeFromLike(obj.id);
    } else {
      toast.success("Added to Wishlist!", {
        position: "top-center",
      });
      addToLike(obj);
    }
    setIsLiked((prev) => !prev);
  };
  const handleCart = (obj) => {
    if (inCart) {
      toast.success("Removed from Cart!", {
        position: "top-center",
      });
      removeFromCart(obj.id,true);
    } else {
      toast.success("Added to Cart!", {
        position: "top-center",
      });
      addToCart(obj);
    }
    setInCart((prev) => !prev);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    fetchProduct();
    setInCart(false);
    setIsLiked(false);
    scrollToTop();
   }, [id]);
  useEffect(()=>{
    const foundOnCart = cart.some((item)=>item.id==id);
    const foundOnLike = like.some((item)=>item.id==id);
    if(foundOnCart) setInCart(true);
    if(foundOnLike) setIsLiked(true);
  },[cart,like,id])
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[90vh] flex-col">
          <img src={loading} className="w-[50px]" alt="" />
          <p className="m-2 font-medium text-lg font-body">Loading</p>
        </div>
      ) : (
        <>
          <section className="grid relative grid-cols-1 place-items-center md:grid-cols-2 md:px-20 font-body pt-8">
            <div className="h-full relative">
              <img
                src={product.image}
                className="h-[250px] object-contain rounded-lg p-2 my-12 md:sticky md:top-36"
                alt={product.name}
              />
            </div>
            <div className="m-5">
              <div className="flex items-center justify-between my-3">
                <p className="border-2 p-2 rounded-md w-fit">In Stock</p>
                <div className="flex text-center items-center gap-3">
                  <button
                    className="border-2 p-2 flex items-center justify-center rounded-lg"
                    onClick={() =>
                      handleLike({
                        id: product._id,
                        title: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                  >
                    <img
                      src={isLiked ? liked : not_liked}
                      className="w-[25px]"
                      alt="like"
                    />
                  </button>
                </div>
              </div>
              <h3 className="py-1 text-xl text-slate-700">{product.name}</h3>
              <h5 className="py-1 text-sm text-slate-400 font-medium">
                {product.description}
              </h5>

              <div className="py-4 flex items-center justify-around">
                <div className="text-center">
                  <p className="text-2xl text-slate-700">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                  <p className="text-center text-xs py-1">
                    inclusive of all taxes
                  </p>
                </div>

                <Rating rating={product.rating} price={product.price} ratingCount={product.ratingCount} />
              </div>
              <div className="flex gap-2 items-center justify-center">
                <div className="flex flex-col items-center gap-3 border-2 w-[100px] h-[100px]  text-center p-1 justify-center rounded-lg">
                  <img src={delivery} className="w-[40px]" alt="" />
                  <p className="text-slate-700 text-xs font-medium">
                    Free Delivery
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 border-2 w-[100px] h-[100px] text-center p-1 justify-center rounded-lg">
                  <img src={payOnDelivery} className="w-[40px]" alt="" />
                  <p className="text-slate-700 text-xs font-medium">
                    Easy Returns
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 border-2 w-[100px] h-[100px] text-center p-1 justify-center rounded-lg">
                  <img src={award} className="w-[40px]" alt="" />
                  <p className="text-slate-700 text-xs font-medium">
                    Top Brand
                  </p>
                </div>
              </div>
              <div className="py-5">
                <p className="text-slate-500 font-medium">
                  <span className="text-slate-500 font-medium">
                    FREE delivery
                  </span>{" "}
                  <span className="font-medium text-black">{`${
                    days[new Date(date).getDay()]
                  }, ${new Date(date).getDate()} ${
                    months[new Date(date).getMonth()]
                  }`}</span>{" "}
                  on orders dispatched by Bluekart over $10
                </p>
              </div>
              <div className="grid gap-3 py-3 place-items-center w-full">
                <button
                  className="p-3 border-2 w-80 rounded-lg"
                  onClick={() =>
                    handleCart({
                      id: product._id,
                      title: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image || product.thumbnail,
                    })
                  }
                >
                  {inCart ? "Remove from cart" : "Add to cart"}
                </button>
                <Link to={`/cart`}>
                <button className="p-3 w-80  bg-blue-500 text-slate-50 border-2 border-blue-500 max-w-80 rounded-lg font-medium" onClick={() =>
                    handleBuyNow({
                      id: product._id,
                      title: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image || product.thumbnail,
                    })
                  }>
                  Buy Now
                </button>
                </Link>
              </div>
            </div>
          </section>
          <Similarproducts category={product.category} id={product._id} />
        </>
      )}
    </>
  );
}

export default Singleproduct;
