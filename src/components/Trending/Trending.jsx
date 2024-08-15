import React, { Suspense, useEffect, useState } from "react";
import loading from "../../assets/images/loading.gif";
import Card from "../Card/Card";
import { ScaleLoader } from "react-spinners";

function Trending() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrendingItems = async () => {
    setIsLoading(true);
    let cache = JSON.parse(sessionStorage.getItem("trending"));
    if (cache) {
      setTrending(cache);
      setIsLoading(false);
      console.log("from cache");
      return;
    }
    const api=import.meta.env.VITE_API;
    let res = await fetch(`${api}/api/products`);
    let data = await res.json();
    console.log(data);
    setTrending((prev) => data.products);
    setIsLoading(false);
    console.log("from server");
    sessionStorage.setItem("trending", JSON.stringify(data.products));
  };
  useEffect(() => {
    getTrendingItems();
  }, []);
  console.log(import.meta.env.VITE_API)
  return (
    <>
      <h2 className="text-slate-700 text-3xl px-6 font-medium text-center pt-8">
        Trending
      </h2>
      {isLoading ? (
         <div className="flex flex-col h-48 pt-10 items-center justify-center">
         <ScaleLoader color="#5e4ef8" />
         <p className="font-medium font-body m-2">Loading</p>
       </div>
      ) : (
        <div className="font-body py-5">
          <div className="flex items-center justify-center lg:px-20">
            <div className="flex gap-10 px-6 overflow-scroll py-10 overflow-y-hidden">
              {trending.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    label={1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Trending;
