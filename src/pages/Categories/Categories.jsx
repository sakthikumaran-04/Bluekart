import React, { useState } from "react";
import smartphone from "../../assets/categories/smartphone.png";
import laptop from "../../assets/categories/laptop.png";
import fragrances from "../../assets/categories/fragrance.png";
import skincare from "../../assets/categories/skincare.png";
import groceries from "../../assets/categories/groceries.png";
import decoration from "../../assets/categories/decoration.png";
import furniture from "../../assets/categories/furniture.png";
import shoes from "../../assets/categories/shoes.png";
import bags from "../../assets/categories/bag.png";
import jewels from "../../assets/categories/jewell.png";
import glasses from "../../assets/categories/sunglasses.png";
import sports from "../../assets/categories/sports.png";
import lighting from "../../assets/categories/lighting.png";
import cloth from "../../assets/categories/cloths.png";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([
    { name: "phones", img: smartphone, value: "smartphone" },
    { name: "laptops", img: laptop, value: "laptop" },
    { name: "fragrances", img: fragrances, value: "fragrances" },
    { name: "skincare", img: skincare, value: "skincare" },
    { name: "groceries", img: groceries, value: "groceries" },
    { name: "decoration", img: decoration, value: "decoration" },
    { name: "furniture", img: furniture, value: "furniture" },
    { name: "clothes", img: cloth, value: "cloths" },
    { name: "shoes", img: shoes, value: "shoes" },
    { name: "bags", img: bags, value: "bags" },
    { name: "jewels", img: jewels, value: "jewels" },
    { name: "sunglasses", img: glasses, value: "sunglasses" },
    { name: "sports", img: sports, value: "sports" },
    { name: "lighting", img: lighting, value: "lighting" },
  ]);
  return (
    <section className="flex font-body text-slate-500 w-full justify-center">
      <div>
        <h2 className="text-center pt-12 text-slate-700 font-medium text-2xl">
          All Categories
        </h2>
        <div className="flex flex-wrap gap-12 justify-center items-center py-8 pb-14 px-1">
          {categories.map((item, i) => {
            return (
              <Link key={item.value} to={`/categories/${item.value}`}>
                <div
                  key={item.name}
                  className="border-2 rounded-md w-[150px] max-sm:w-[110px] flex flex-col items-center justify-center max-sm:h-[140px] h-[150px] cursor-pointer md:hover:scale-110 gap-2"
                >
                  <img src={item.img} className="h-[60px] pb-1" alt="" />
                  <p>{item.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
