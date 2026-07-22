import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/counter">Counter</Link>
      <br />
      <Link to="/ecomm">Ecomm</Link>
      <br />
      <Link to="/userform">UserForm</Link>
    </div>
  );
};

export default Navigation;
