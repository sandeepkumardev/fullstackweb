import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { IoCaretDown } from "react-icons/io5";

// hook
// useState, useEffect, useRef

const Navbar = () => {
  const [inputSelected, setInputSelected] = useState(false);

  return (
    <div className="text-white border-b flex items-center justify-between p-4 bg-gray-800">
      <h1 className="text-2xl font-bold">Ecomm</h1>

      <div
        onClick={() => setInputSelected(true)}
        className={`flex items-center border-2 rounded ${inputSelected ? "border-amber-600" : "border-gray-800"} bg-white`}
      >
        <input className={`outline-0`} />
        <div className="bg-amber-600">
          <Search />
        </div>
      </div>

      <div className="flex gap-1">
        <div className="p-3 leading-none border-2 rounded border-gray-800 hover:border-white">
          Hello, sign in <br />{" "}
          <div className="font-bold relative">
            <span>Account & Lists</span> <IoCaretDown className="absolute -right-3.5 top-0.75" />
          </div>
        </div>
        <div className="p-3 leading-none border-2 rounded border-gray-800 hover:border-white">
          Returns <br />
          <span className="font-bold">& orders</span>
        </div>
        <div className="p-3 flex items-center gap-1 relative border-2 rounded border-gray-800 hover:border-white">
          <span className="absolute top-0.5 right-13.5 font-bold text-amber-600">0</span>
          <ShoppingCart />
          <span className="font-bold">Cart</span>
        </div>
      </div>

      <div>{/* links */}</div>

      {/* <div
        onClick={() => setInputSelected(false)}
        className={`${inputSelected ? "block" : "hidden"} top-20 fixed h-full w-screen bg-black/50`}
      ></div> */}
    </div>
  );
};
``;

export default Navbar;
