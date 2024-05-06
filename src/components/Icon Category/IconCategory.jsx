import React from "react";
import { Link } from "react-router-dom";
import smartphone from "../../assets/categories/smartphone.png";
import laptop from "../../assets/categories/laptop.png";
import furniture from "../../assets/categories/furniture.png";
import lighting from "../../assets/categories/lighting.png";
function IconCategory() {
  return (
    <section className="px-10 py-10 font-body relative pb-14">
      <h2 className="text-slate-700 text-3xl font-medium text-center py-8">
        Categories
      </h2>
      <div className="flex items-center justify-around flex-wrap gap-4 max-sm:zoom">
        <Link to={"/categories/smartphone"}><div className="border-2 rounded-md w-[150px] max-sm:w-[110px] flex flex-col items-center justify-center max-sm:h-[140px] h-[150px] text-lg cursor-pointer md:hover:scale-110">
          <img
            src={smartphone}
            className="h-[70px] p-2"
            alt="smartphone category"
          />
          <h3>Phones</h3>
        </div></Link>
        <Link to={"/categories/laptop"}><div className="border-2 rounded-md w-[150px] max-sm:w-[110px] flex flex-col items-center justify-center max-sm:h-[140px] h-[150px] text-lg cursor-pointer md:hover:scale-110">
          <img src={laptop} className="h-[70px] p-2" alt="laptop category" />
          <h3>Laptops</h3>
        </div></Link>
        <Link to={"/categories/furniture"}><div className="border-2 rounded-md w-[150px] max-sm:w-[110px] flex flex-col items-center justify-center max-sm:h-[140px] h-[150px] text-lg cursor-pointer md:hover:scale-110">
          <img
            src={furniture}
            className="h-[70px] p-2"
            alt="furniture category"
          />
          <h3>Furnitures</h3>
        </div></Link>
        <Link to={"/categories/lighting"}><div className="border-2 relative rounded-md w-[150px] max-sm:w-[110px] flex flex-col items-center justify-center max-sm:h-[140px] h-[150px] text-lg cursor-pointer md:hover:scale-110">
          <img
            src={lighting}
            className="w-[55px] p-2"
            alt="lighting category"
          />
          <h3>Lighting</h3>
        </div></Link>
      </div>
      <Link
        to="/categories"
        className="absolute top-[95%] text-blue-600 w-full text-center left-0"
      >
        All Categories...
      </Link>
    </section>
  );
}

export default IconCategory;
