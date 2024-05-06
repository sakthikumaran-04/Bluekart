import React, { useEffect, useState } from "react";
import loadingScreen from "../../assets/images/loading.gif";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import notFound from "../../assets/images/no_data.jpg";
function SearchResults() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  const getSearch = async () => {
    setLoading(true);
    const api=import.meta.env.VITE_API;
    const response = await fetch(
      `${api}/api/products/search?query=${search}&limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    setTotal(data.total);
    setProducts((prev) => [...prev, ...data.products]);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    // Fetch products when skip value changes
    getSearch();
  }, [skip, search]); // Trigger when skip changes

  useEffect(() => {
    // Clear products when search query changes
    setProducts([]);
    // Reset skip value
    setSkip(0);
  }, [search]); // Trigger when search query changes
  console.log(total);
  if (total == 0 && loading == false) {
    return (
      <div className="flex items-center justify-center ">
        <img src={notFound} className="w-[320px]" alt="" />
      </div>
    );
  }
  return (
    <section className="font-body flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-blue-500 text-lg pt-6">
          Showing Results for "{search}"
        </h3>
        <div className="flex flex-wrap gap-12 pb-12 items-center justify-center">
          {products.map((item) => {
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
        {loading ? (
          <img src={loadingScreen} className="w-[100px] py-6" alt="Loading" />
        ) : (
          ""
        )}
        {skip + 5 < total ? (
          <button
            className="bg-blue-500 p-2 rounded-lg w-[120px] m-12"
            onClick={() => setSkip((prev) => prev + 5)}
          >
            Show more
          </button>
        ) : (
          " "
        )}
      </div>
    </section>
  );
}

export default SearchResults;
