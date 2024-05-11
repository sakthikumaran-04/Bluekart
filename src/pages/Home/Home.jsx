import React, { useEffect } from "react";
import IconCategory from "../../components/Icon Category/IconCategory";
import Trending from "../../components/Trending/Trending";
import CurrentOffer from "../../components/CurrentOffer/CurrentOffer";
import Popular from "../../components/Popular/Popular";
import Newsletter from "../../components/Newsletter/Newsletter";
import Hero from "../../components/Hero/Hero";
import {useNavigate} from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import {toast} from "react-toastify";
import { account } from "../../appwrite/config";

function Home() {
  const auth = useAuthStore((state)=>state.auth);
const navigate=useNavigate();
useEffect(()=>{
  async function doCheckAuth(){
    try {
      const data = await account.get("current");
      } catch (error) {
          toast.error("You need to login!", {
            position: "top-center",
          });
          navigate("/signup");
      }
      if(auth && !auth.isVerified){
        navigate("/auth/verify");
      }
      if(auth.isVerified){
        toast.success("Login success!", {
          position: "top-center",
        });
      }
  }
  doCheckAuth()
},[auth])
  return (
    <>
      <Hero />
      <IconCategory />
      <Trending />
      <CurrentOffer />
      <Popular />
      <Newsletter />
    </>
  );
}

export default Home;
