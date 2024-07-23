import React, { useRef } from "react";
import { useState } from "react";
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
  const cartLength=useCartStore((state)=>state.cart?.length);
  const [showSearch, setshowSearch] = useState(true);
  const navigate = useNavigate();
  const DesktopInput = useRef(null);
  const mobileInput = useRef(null);
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
    DesktopInput.current.value = "";
    DesktopInput.current.blur();
    mobileInput.current.value = "";
    mobileInput.current.blur();
  };

  
  return (
    <>
      <nav className="sticky top-0 z-10 font-body shadow-md bg-white py-2 w-full">
        <section className="w-[100%] py-2 flex items-center justify-around md:grid md:grid-cols-[200px_1fr_200px] md:place-items-center grid-cols-2">
          <Link to={"/"}>
            <section className="flex items-center gap-3 md:pl-8">
              <img
                src={logo}
                className="md:w-[40px] w-[30px]"
                alt="logo"
              />
              <img
                src={logo2}
                className="md:w-[120px] w-[100px]"
                alt="logo"
              />
            </section>
          </Link>
            <form className="items-center justify-between sm:w-[80%] lg:w-[70%] hidden md:flex relative" onSubmit={search}>
              <input
                type="text"
                className="p-2 border-2 rounded-md w-full"
                name="search"
                id="search"
                placeholder="Search here..."
                ref={DesktopInput}
                onChange={handleSearch}
                autoComplete="off"
              />
              {/* <Link to={`/search/${query}`} className="flex"> */}
              <button aria-label="search" type="submit">
                <img
                  src={searchIcon}
                  className="bg-blue-500 p-2 border-2 border-blue-500 rounded-md h-[42px] ml-2"
                  alt="search"
                  aria-label="search"
                />
              </button>
              <Search
        query={query}
        showSearch={showSearch}
        setshowSearch={setshowSearch}
        inpRef={DesktopInput.current}
      />
              {/*</Link> */}
            </form>
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
            <div className=" relative">
            <img
              src={profile}
              className="p-1 w-[30px] cursor-pointer"
              alt="profile"
              onClick={handleMenu}
              aria-label="profile"
            />
              <Menu isMenu={menu} setMenu={setMenu} />
            </div>
          </section>
        </section>
          <section className="flex justify-center w-[100%] md:hidden">
            <form
              className="flex items-center justify-center w-full"
              onSubmit={search}
            >
              <input
                type="text"
                className="w-[80%] p-2 mr-2 border-2 rounded-md input"
                name="search"
                id="search"
                placeholder="Search here..."
                ref={mobileInput}
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
              <Search
        query={query}
        showSearch={showSearch}
        setshowSearch={setshowSearch}
        inpRef={mobileInput.current}
      />
            </form>
          </section>
      </nav>
      
    </>
  );
}

export default Navbar;
