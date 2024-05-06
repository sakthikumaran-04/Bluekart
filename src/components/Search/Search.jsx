import React, { useEffect, useState } from "react";
import SearchCard from "../SearchCard/SearchCard";
import loadingimg from "../../assets/images/loading.gif";
import { Link } from "react-router-dom";

function Search({ query, showSearch, setshowSearch, inpRef }) {
  const [searchResults, setsearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSearch = async () => {
    if (query.trim() != "") {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/products/search?query=${query}&limit=5`
      );
      const data = await response.json();
      console.log(data)
      setsearchResults(data.products);
      setLoading(false);
    } else {
      setsearchResults([]);
    }
  };
  console.log(searchResults);
  useEffect(() => {
    getSearch();
    setshowSearch(true);
  }, [query]);

  return (
    <>
      {!loading ? (
        <div
          className={`${
            query.trim() != "" && showSearch ? "visible" : "invisible"
          } fixed z-50  left-[50%] translate-y-[-0px] font-body translate-x-[-50%] text-center bg-slate-50 border-2 w-[360px] rounded-lg`}
        >
          {searchResults.map((item) => {
            return (
              <SearchCard
                key={item._id}
                setshowSearch={setshowSearch}
                id={item._id}
                image={item.image}
                name={item.name}
                description={item.description}
                inpRef={inpRef}
              />
            );
          })}
          <Link to={`/search/${query}`}>
            <p
              onClick={() => {
                setshowSearch(false);
                inpRef.value = "";
              }}
              className="text-slate-800 p-3"
            >
              search for "{query}"
            </p>
          </Link>
        </div>
      ) : (
        <div
          className={`${
            query.trim() != "" ? "visible" : "invisible"
          }  flex items-center justify-center absolute gap-3 font-body p-2 left-[50%] translate-x-[-50%] bg-slate-50 w-[360px] rounded-lg border-2 z-30`}
        >
          <img src={loadingimg} className="w-[30px] my-1" alt="loading" />
          Loading...
        </div>
      )}
    </>
  );
}

export default Search;
