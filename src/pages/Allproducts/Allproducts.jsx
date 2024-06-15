import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import loadingScreen from "../../assets/images/loading.gif";
import filter from "../../assets/images/filter.svg";

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
      <div className="flex items-center gap-20">
        <p className="text-blue-500">Showing {allproducts.length} of 100</p>
        <div className="relative">
          <div className="flex items-center gap-1 border-2 p-3 rounded-md cursor-pointer " onClick={()=>setShowSortMenu((prev)=>(!prev))}>
          <p>Sort</p>
          <img src={filter} className="w-[20px]" alt="" />
            
          </div>
          <div className={`absolute top-14 left-[50%] z-10 translate-x-[-50%] max-sm:left-0 max-sm:translate-x-[-60%] w-[220px] p-4 bg-white border-2 rounded-lg transition-all ease-in duration-150 opacity-0 ${showSortMenu?" opacity-100 visible":" invisible"}`}>
            <h3 className="text-lg pb-1 mb-2 border-b-2">Sort by</h3>
            <div className="w-full flex flex-col gap-1 text-slate-800">
            <div className="w-full flex justify-between">
                <label htmlFor="default">Default</label>
                <input type="radio" name="sort" id="default" value={"default"} checked={sortBy=="default"} onChange={handleSortBy}/>
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="priceLtoH">Price: Low to High</label>
                <input type="radio" name="sort" id="priceLtoH" value={"priceLtoH"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="priceHtoL">Price: High to Low</label>
                <input type="radio" name="sort" id="priceHtoL" value={"priceHtoL"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="ratingLtoH">Rating: Low to High</label>
                <input type="radio" name="sort" id="ratingLtoH" value={"ratingLtoH"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="ratingHtoL">Rating: High to Low</label>
                <input type="radio" name="sort" id="ratingHtoL" value={"ratingHtoL"} onChange={handleSortBy}  />
              </div>
            </div>
          </div>
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
