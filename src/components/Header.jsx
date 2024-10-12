import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between p-4 mx-8">
        <div>
          <h1 className="font-bold text-[#232F70] text-xl">
            Good Morning, Kien Duong
          </h1>
          <p className="font-base text-md">Have a nice day</p>
        </div>
        <div className="flex items-center gap-x-4">
          <button className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            <span>
              <IoIosAddCircleOutline />
            </span>
            <span>New Device</span>
          </button>
          <div>
            <input type="text" placeholder="Search device..." className="px-4 py-2 rounded-lg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
