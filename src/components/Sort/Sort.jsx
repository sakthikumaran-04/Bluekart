import React from "react";
import filter from "../../assets/images/filter.svg";

function Sort({ showSortMenu, handleSortBy, sortBy ,setShowSortMenu }) {
  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 border-2 p-3 rounded-md cursor-pointer "
        onClick={() => setShowSortMenu((prev) => !prev)}
      >
        <p>Sort</p>
        <img src={filter} className="w-[20px]" alt="" />
      </div>
      <div
        className={`absolute top-14 left-[50%] z-10 translate-x-[-50%] max-sm:left-0 max-sm:translate-x-[-60%] w-[220px] p-4 bg-white border-2 rounded-lg transition-all ease-in duration-150 opacity-0 ${
          showSortMenu ? " opacity-100 visible" : " invisible"
        }`}
      >
        <h3 className="text-lg pb-1 mb-2 border-b-2">Sort by</h3>
        <div className="w-full flex flex-col gap-1 text-slate-800">
          <div className="w-full flex justify-between">
            <label htmlFor="default">Default</label>
            <input
              type="radio"
              name="sort"
              id="default"
              value={"default"}
              checked={sortBy == "default"}
              onChange={handleSortBy}
            />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="priceLtoH">Price: Low to High</label>
            <input
              type="radio"
              name="sort"
              id="priceLtoH"
              value={"priceLtoH"}
              onChange={handleSortBy}
            />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="priceHtoL">Price: High to Low</label>
            <input
              type="radio"
              name="sort"
              id="priceHtoL"
              value={"priceHtoL"}
              onChange={handleSortBy}
            />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="ratingLtoH">Rating: Low to High</label>
            <input
              type="radio"
              name="sort"
              id="ratingLtoH"
              value={"ratingLtoH"}
              onChange={handleSortBy}
            />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="ratingHtoL">Rating: High to Low</label>
            <input
              type="radio"
              name="sort"
              id="ratingHtoL"
              value={"ratingHtoL"}
              onChange={handleSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sort;
