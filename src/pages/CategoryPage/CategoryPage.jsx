import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadingScreen from "../../assets/images/loading.gif";
import filter from "../../assets/images/filter.svg";
import Card from "../../components/Card/Card";
function CategoryPage() {
  const { category } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const fetchCategoryProducts = async () => {
    setisLoading(true);
    const api=import.meta.env.VITE_API;
    const response = await fetch(
      `${api}/api/category/${category}`
    );
    const data = await response.json();
    setCategoryProducts([...data.products]);
    setisLoading(false);
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[90vh] flex-col">
          <img src={loadingScreen} className="w-[70px]" alt="" />
          <p className="m-8 text-lg font-body">Loading</p>
        </div>
      ) : (
        <section className="font-body">
          <div className="flex items-center gap-20 justify-center py-4">
            <p className="text-blue-500">
              Showing {categoryProducts.length} of 10
            </p>
            <div className="flex items-center gap-1 border-2 p-3 rounded-md">
              <p>Filter</p>
              <img src={filter} className="w-[20px]" alt="" />
            </div>
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
        </section>
      )}
    </>
  );
}

export default CategoryPage;
