import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosCalendar } from "react-icons/io";
import { RiHome5Line } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
import { AiOutlineCoffee, AiOutlineLogout } from "react-icons/ai";

function Sidebar() {
  const location = useLocation();
  const navigations = [
    {
      id: 1,
      name: "Dashboard",
      icon: <RiDashboardLine size={24} />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Living room",
      icon: <RiHome5Line size={24} />,
      path: "/living-room",
    },
    {
      id: 3,
      name: "Bed room",
      icon: <GoInbox size={24} />,
      path: "/bed-room",
    },
    {
      id: 4,
      name: "Kitchen",
      icon: <AiOutlineCoffee size={24} />,
      path: "/kitchen-room",
    },
    {
      id: 5,
      name: "Schedules",
      icon: <IoIosCalendar size={24} />,
      path: "/schedules",
    },
  ];

  return (
    <div
      className="w-[30%] h-full bg-white rounded-xl py-4 px-4 flex flex-col"
      style={{ minHeight: `calc(100vh - 4px)` }}
    >
      <div className="mt-2">
        <h1 className="font-bold text-xl text-black text-center">SmartHome</h1>
        <div className="w-full h-[1px] bg-gray-100 my-6"></div>
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          {navigations.map((item) => (
            <li key={item.id} className="my-4">
              <Link
                to={item.path}
                className={`flex items-center py-4 px-4 space-x-3 rounded-lg text-gray-600 
                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                    : ""
                }
                hover:bg-gray-100`}
              >
                <span
                  className={`${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        to={"#"}
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 mt-auto px-4 py-4 rounded-lg bg-red-100"
      >
        <AiOutlineLogout className="text-xl" />
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default Sidebar;
