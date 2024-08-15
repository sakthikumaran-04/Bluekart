import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import notFound from "../../assets/images/no_data.jpg";
import filter from "../../assets/images/filter.svg";
import { ScaleLoader } from "react-spinners";
function SearchResults() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState("default")
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  function handleSortBy(e){
    setSkip(0);
    setSortBy(e.target.value);
    setTimeout(() => setShowSortMenu(false),300);
  }
  const getSearch = async ({clearPrev}) => {
    setLoading(true);
    const api=import.meta.env.VITE_API;
    const response = await fetch(
      `${api}/api/products/search?query=${search}&limit=${limit}&skip=${skip}&sort=${sortBy}`
    );
    const data = await response.json();
    setTotal(data.total);
    if(clearPrev) setProducts([...data.products]);
    else setProducts((prev)=>[...prev,...data.products]);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    // Fetch products when skip value changes
    getSearch({clearPrev:false});
  }, [skip, search]); // Trigger when skip changes

  useEffect(() => {
    // Clear products when search query changes
    setProducts([]);
    // Reset skip value
    setSortBy("default")
    setSkip(0);
  }, [search]); // Trigger when search query changes
  useEffect(()=>{
    getSearch({clearPrev:true})
  },[sortBy])
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
      <div className="flex items-center justify-between w-full max-w-[1080px] my-8 max-sm:justify-around max-sm:gap-0">
        <p className="text-blue-500 mr-20">Results for  "{search.length>5 ? search.slice(0,5)+"...":search}"</p>
        <div className="relative">
          <div className="flex items-center gap-1 border-2 p-3 rounded-md cursor-pointer " onClick={()=>setShowSortMenu((prev)=>(!prev))}>
          <p>Sort</p>
          <img src={filter} className="w-[20px]" alt="" />
            
          </div>
          <div className={`absolute top-14 left-[50%] z-10 translate-x-[-50%] max-sm:left-0 max-sm:translate-x-[-60%] w-[220px] p-4 bg-white border-2 rounded-lg transition-all ease-in duration-150 opacity-0 ${showSortMenu?" opacity-100 visible":" invisible"}`}>
            <h3 className="text-lg pb-1 mb-2 border-b-2">Sort by</h3>
            <div className="w-full flex flex-col gap-1 text-slate-800">
            <div className="w-full flex justify-between">
                <label htmlFor="default" className="grow cursor-pointer">Default</label>
                <input type="radio" name="sort" id="default" value={"default"} checked={sortBy=="default"} onChange={handleSortBy}/>
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="priceLtoH" className="grow cursor-pointer">Price: Low to High</label>
                <input type="radio" name="sort" id="priceLtoH" value={"priceLtoH"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="priceHtoL" className="grow cursor-pointer">Price: High to Low</label>
                <input type="radio" name="sort" id="priceHtoL" value={"priceHtoL"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="ratingLtoH" className="grow cursor-pointer">Rating: Low to High</label>
                <input type="radio" name="sort" id="ratingLtoH" value={"ratingLtoH"} onChange={handleSortBy} />
              </div>
              <div className="w-full flex justify-between">
                <label htmlFor="ratingHtoL" className="grow cursor-pointer">Rating: High to Low</label>
                <input type="radio" name="sort" id="ratingHtoL" value={"ratingHtoL"} onChange={handleSortBy}  />
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="flex flex-wrap gap-12 pb-12 items-center justify-center w-full">
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
           <div className="flex flex-col h-48 pt-10 items-center justify-center">
           <ScaleLoader color="#5e4ef8" />
           <p className="font-medium font-body m-2">Loading</p>
         </div>
        ) : (
          ""
        )}
        {skip + 5 < total ? (
          <button
            className="bg-blue-500 p-2 rounded-lg w-[120px] m-12 text-white font-medium"
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
