import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import CategoryItems from "../components/CategoryItems";
import Footer from "../components/Footer";

import { data } from "../data/products.js";

const Ecomm = () => {
  return (
    <div>
      <Navbar />
      <Banner />

      {Object.keys(data).map((v) => (
        <CategoryItems name={v} products={data[v]} />
      ))}

      <Footer />
    </div>
  );
};

export default Ecomm;
