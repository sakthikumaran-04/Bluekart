import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadingScreen from "../../assets/images/loading.gif";
import filter from "../../assets/images/filter.svg";
import Card from "../../components/Card/Card";
import Sort from "../../components/Sort/Sort";
function CategoryPage() {
  const { category } = useParams();
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setisLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  function handleSortBy(e){
    setSortBy(e.target.value);
    setTimeout(() => setShowSortMenu(false),300);
  }
  const fetchCategoryProducts = async () => {
    setisLoading(true);
    const api=import.meta.env.VITE_API;
    const response = await fetch(
      `${api}/api/category/${category}?sort=${sortBy}`
    );
    const data = await response.json();
    setCategoryProducts([...data.products]);
    setisLoading(false);
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, [sortBy]);

  return (
    <>
        <section className="font-body">
          <div className="flex items-center gap-20 justify-center py-4">
            <p className="text-blue-500">
              Showing {categoryProducts.length} of 10
            </p>
            <Sort sortBy={sortBy} handleSortBy={handleSortBy} showSortMenu={showSortMenu} setShowSortMenu={setShowSortMenu}/>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 pb-12">
            {categoryProducts.map((item) => {
              return (
                <Card
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  rating={item.rating}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                />
              );
            })}
          </div>
          {isLoading ? (
        <div className="flex flex-col font-medium items-center justify-center">
          <img src={loadingScreen} className="w-[60px]" alt="Loading" />
          <p>Loading</p>
        </div>
      ) : (
        ""
      )}
        </section>
    </>
  );
}

export default CategoryPage;
