import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/categories/login.svg";
import logout from "../../assets/categories/logout.svg";
function Menu(props) {
  const [isLogin, setisLogin] = useState(false);

  return (
    <div
      className={`text-center font-body fixed z-30 right-5 ${
        props.isMenu ? "visible" : "invisible"
      } top-16 bg-slate-50 p-7 border-2 rounded-lg flex flex-col`}
    >
      <Link to={"/account"}>
        <button className="p-1" onClick={() => props.setMenu((prev) => !prev)}>
          Account
        </button>
      </Link>
      <Link to={"/bug-report"}>
        <button className="p-1" onClick={() => props.setMenu((prev) => !prev)}>
          Report Bug
        </button>
      </Link>
      <Link to={`${!isLogin ? "/logout" : "/signin"}`}>
        <button
          className="px-5 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg mt-3"
          onClick={() => {
            props.setMenu((prev) => !prev);
            setisLogin(!isLogin);
          }}
        >
          {!isLogin ? "Logout" : "Login"}
          <img src={isLogin ? login : logout} className="w-[20px]" alt="" />
        </button>
      </Link>
    </div>
  );
}

export default Menu;
