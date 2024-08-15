import React from "react";
import { useState, useEffect } from "react";
import loading from "../../assets/images/loading.gif";
import Card from "../Card/Card";
import { ScaleLoader } from "react-spinners";

function Popular() {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getPopularItems = async () => {
    setIsLoading(true);
    let cache= JSON.parse(sessionStorage.getItem("popular"));
    if(cache){
      setPopular(cache);
      setIsLoading(false);
      console.log("from cache")
      return;
    }
    const api=import.meta.env.VITE_API;
    const res = await fetch(
      `${api}/api/category/laptop?skip=1&limit=9`
    );
    let data = await res.json();
    console.log(data)
    setPopular((prev) => data.products);
    setIsLoading(false);
    console.log("from server")
    sessionStorage.setItem("popular",JSON.stringify(data.products))
  };
  useEffect(() => {
    getPopularItems();
  }, []);

  return (
    <>
      <h2 className="text-slate-700 text-3xl font-medium text-center pt-8">
        Popular
      </h2>
      {isLoading ? (
        <div className="flex flex-col h-48 pt-10 items-center justify-center">
          <ScaleLoader color="#5e4ef8" />
          <p className="font-medium font-body m-2">Loading</p>
        </div>
      ) : (
        <div className="font-body py-5 pb-20">
          <div className="flex items-center justify-center lg:px-20">
            <div className="flex gap-10 px-6 overflow-scroll py-10 overflow-y-hidden">
              {popular.map((item) => {
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

export default Popular;
