import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import loadingScreen from "../../assets/images/loading.gif";
import Sort from "../../components/Sort/Sort";

function Allproducts() {
  const [allproducts, setAllproducts] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState("default")
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  function handleSortBy(e){
    setSkip(0);
    setSortBy(e.target.value);
    setTimeout(() => setShowSortMenu(false),300);
  }
  async function fetchAllproducts({clearPrev}) {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/api/products?skip=${skip}&limit=${limit}&sort=${sortBy}`
    );
    const data = await response.json();
    if(clearPrev) setAllproducts([...data.products]);
    else setAllproducts((prev)=>[...prev,...data.products]);
    setLoading(false);
  }
  useEffect(() => {
    fetchAllproducts({clearPrev:false});
  }, [skip]);
  useEffect(()=>{
    fetchAllproducts({clearPrev:true});
  },[sortBy])
  return (
    <section className="flex flex-col items-center justify-center font-body">
      <h2 className="text-center py-10 text-slate-500 font-medium text-2xl">
        All Products
      </h2>
      <div className="flex items-center gap-20 pb-8">
        <p className="text-blue-500">Showing {allproducts.length} of 100</p>
          <Sort sortBy={sortBy} handleSortBy={handleSortBy} showSortMenu={showSortMenu} setShowSortMenu={setShowSortMenu}/>
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
          className="bg-blue-500 p-2 rounded-lg w-[120px] m-12 text-white font-medium"
          onClick={() => setSkip((prev) => prev + 5)}
        >
          Show More
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default Allproducts;
