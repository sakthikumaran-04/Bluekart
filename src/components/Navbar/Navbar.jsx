import React, { useRef } from "react";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import searchIcon from "../../assets/images/search.png";
import favourites from "../../assets/images/not-liked.svg";
import cart from "../../assets/images/cart.svg";
import profile from "../../assets/images/profile.svg";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { useCartStore } from "../../store/CartStore.js";
function Navbar() {
  const cartLength=useCartStore((state)=>state.cart.length);
  const [showSearch, setshowSearch] = useState(true);
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const input = useRef(null);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  const handleMenu = () => {
    setMenu(!menu);
  };
  const search = (e) => {
    e.preventDefault();
    setshowSearch(false);
    if (query.trim() != "") navigate(`search/${query}`);
    input.current.value = "";
    input.current.blur();
  };

  const detectResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", detectResize);

    return () => {
      window.removeEventListener("resize", detectResize);
    };
  }, [screenWidth]);
  return (
    <>
      <nav className="sticky top-0 z-10 font-body shadow-md bg-white py-2 w-[100%] overflow-hidden">
        <section className="font-body flex justify-around w-[100%] items-center py-2">
          <Link to={"/"}>
            <section className="flex items-center gap-3">
              <img
                src={logo}
                className={`${screenWidth > 700 ? "w-[50px]" : "w-[35px]"}`}
                alt="logo"
              />
              <img
                src={logo2}
                className={`${screenWidth > 700 ? "w-[120px]" : "w-[90px]"}`}
                alt="logo"
              />
            </section>
          </Link>
          {screenWidth > 700 ? (
            <form className="flex items-center gap-2" onSubmit={search}>
              <input
                type="text"
                className="p-2 border-2 rounded-md"
                name="search"
                id="search"
                placeholder="Search here..."
                ref={input}
                onChange={handleSearch}
                autoComplete="off"
              />
              {/* <Link to={`/search/${query}`} className="flex"> */}
              <button aria-label="search" type="submit">
                <img
                  src={searchIcon}
                  className="bg-blue-500 p-2 border-2 border-blue-500 rounded-md h-[42px]"
                  alt="search"
                  aria-label="search"
                />
              </button>
              {/*</Link> */}
            </form>
          ) : (
            ""
          )}
          <section className="flex items-center gap-3">
            <Link to={"/cart"}>
              <span className="relative">
                <img
                  src={cart}
                  className="p-1 w-[30px]"
                  alt="cart"
                  aria-label="cart items"
                />
                <span className="text-sm bg-red-500 cursor-pointer text-slate-100 absolute rounded-full w-[15px] h-[18px] top-[-7px] right-[-5px] text-center">
                  {cartLength}
                </span>
              </span>
            </Link>
            <Link to={"/favourites"}>
              <img
                src={favourites}
                className="p-1 w-[30px]"
                alt="likes"
                aria-label="favourites"
              />
            </Link>
            <img
              src={profile}
              className="p-1 w-[30px] cursor-pointer"
              alt="profile"
              onClick={handleMenu}
              aria-label="profile"
            />
          </section>
        </section>
        {screenWidth < 700 ? (
          <section className="flex justify-center w-[100%]">
            <form
              className="flex items-center justify-center"
              onSubmit={search}
            >
              <input
                type="text"
                className="w-[70%] p-2 mr-2 border-2 rounded-md input"
                name="search"
                id="search"
                placeholder="Search here..."
                ref={input}
                onChange={handleSearch}
                autoComplete="off"
              />
              <button type="submit">
                <img
                  src={searchIcon}
                  className="bg-blue-500 p-2 border-2 border-blue-500 rounded-md h-[42px]"
                  alt=""
                />
              </button>
            </form>
          </section>
        ) : (
          ""
        )}
      </nav>
      <Menu isMenu={menu} setMenu={setMenu} />
      <Search
        query={query}
        showSearch={showSearch}
        setshowSearch={setshowSearch}
        inpRef={input.current}
      />
    </>
  );
}

export default Navbar;
