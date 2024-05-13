import React, { useEffect } from "react";
import IconCategory from "../../components/Icon Category/IconCategory";
import Trending from "../../components/Trending/Trending";
import CurrentOffer from "../../components/CurrentOffer/CurrentOffer";
import Popular from "../../components/Popular/Popular";
import Newsletter from "../../components/Newsletter/Newsletter";
import Hero from "../../components/Hero/Hero";

function Home() {
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
