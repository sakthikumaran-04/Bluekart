import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/categories/login.svg";
import logoutImg from "../../assets/categories/logout.svg";
import { useAuthStore } from "../../store/AuthStore.js";
import {useNavigate} from "react-router-dom";
import { useCartStore } from "../../store/CartStore";
import { useLikeStore } from "../../store/LikeStore";
function Menu(props) {
  const auth = useAuthStore((state)=>state.auth);
  const resetCart = useCartStore((state)=>state.resetCart);
  const resetLike = useLikeStore((state)=>state.resetLike);
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  const logout=useAuthStore((state)=>state.logout)
  const handleLogin = async() =>{
    if(isLogin){
      await logout();
      setisLogin(false);
    }else{
      navigate("/signup")
    }
  }
  useEffect(()=>{

    if(auth?.id){
      setisLogin(true);
    }else{
      setisLogin(false);
      resetCart();
      resetLike();
    }

  },[auth])
  return (
    <div
      className={`text-center font-body fixed z-30 right-5 ${
        props.isMenu ? "visible" : "invisible"
      } top-16 bg-slate-50 p-7 border-2 rounded-lg flex flex-col`}
    >
      <Link to={"/myorders"}>
        <button className="p-1" onClick={() => props.setMenu((prev) => !prev)}>
          My Orders
        </button>
      </Link>
      <Link to={"/bug-report"}>
        <button className="p-1" onClick={() => props.setMenu((prev) => !prev)}>
          Report Bug
        </button>
      </Link>
      <Link to={"/signup"}>
        <button
          className="px-5 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg mt-3"
          onClick={() => {
            props.setMenu((prev) => !prev);
            handleLogin()
          }}
        
        >
          {isLogin ? "Logout" : "Login"}
          <img src={isLogin ? login : logoutImg} className="w-[20px]" alt="" />
        </button>
      </Link>
    </div>
  );
}

export default Menu;
