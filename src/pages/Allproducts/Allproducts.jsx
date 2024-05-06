import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import loadingScreen from "../../assets/images/loading.gif";
import filter from "../../assets/images/filter.svg";

function Allproducts() {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  async function fetchAllproducts() {
    setLoading(true);
    const response = await fetch(
      `/api/products?skip=${skip}&limit=${limit}`
    );
    const data = await response.json();
    setAllproducts((prev) => [...prev, ...data.products]);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllproducts();
  }, [skip]);
  return (
    <section className="flex flex-col items-center justify-center font-body">
      <h2 className="text-center py-10 text-slate-500 font-medium text-2xl">
        All Products
      </h2>
      <div className="flex items-center gap-20">
        <p className="text-blue-500">Showing {allproducts.length} of 100</p>
        <div className="flex items-center gap-1 border-2 p-3 rounded-md">
          <p>Filter</p>
          <img src={filter} className="w-[20px]" alt="" />
        </div>
      </div>
        <div className="flex flex-wrap items-center justify-center gap-9 pb-12">
          {allproducts.map((item) => {
            return (
              <Card
                key={item._id}
                id={item._id}
                rating={item.rating}
                ratingCount={item.ratingCount}
                image={item.image}
                title={item.name}
                description={item.description}
                price={item.price}
              />
            );
          })}
        </div>
      {loading ? (
        <div className="flex flex-col font-medium items-center justify-center">
          <img src={loadingScreen} className="w-[60px]" alt="Loading" />
          <p>Loading</p>
        </div>
      ) : (
        ""
      )}
      {allproducts.length < 100 ? (
        <button
          className="bg-blue-500 p-2 rounded-lg w-[120px] m-12"
          onClick={() => setSkip((prev) => prev + 5)}
        >
          Show More...
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default Allproducts;
