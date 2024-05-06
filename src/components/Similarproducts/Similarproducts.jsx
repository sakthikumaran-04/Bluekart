import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

function Similarproducts({ category, id }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const fetchSimilarProduct = async () => {
      const api = import.meta.env.VITE_API;
      console.log(api);
      const response = await fetch(`${api}/api/category/${category}`);
      const data = await response.json();
      setSimilarProducts(data.products);
  };
  useEffect(() => {
    fetchSimilarProduct();
  }, [category, id]);
  console.log(similarProducts);

  return (
    <div className="font-body py-5 lg:text-center">
      <h2 className="text-slate-500 text-2xl px-6 font-medium">
        Similar Products
      </h2>
      <div className="flex items-center justify-center lg:px-20">
        <div className="flex gap-12 px-6 overflow-scroll py-5 overflow-y-hidden ">
          {similarProducts.map((item) => {
             return (item._id == id ? "" :
              <Card
                key={item._id}
                id={item._id}
                image={item.image}
                rating={item.rating}
                title={item.name}
                description={item.description}
                price={item.price}
                ratingCount={item.ratingCount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Similarproducts;
