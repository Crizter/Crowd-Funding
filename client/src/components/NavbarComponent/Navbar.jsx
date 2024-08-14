import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useLocation, NavLink } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/getId`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
      }
    };
    fetchId();
  }, [BACKEND_URL, token]);

  const hasJwt = () => {
    return token ? true : false;
  };

  const navLinkClass = ({ isActive, isPending }) =>
    `block py-2 px-3 rounded ${
      isActive
        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
        : isPending
        ? "text-gray-500"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    }`;

  if (hasJwt()) {
    return (
      <nav className="bg-gray-200 p-3  rounded-full m-8  border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to={`/login/home/${userId}`}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CROWD FUNDING
            </span>
          </NavLink>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={`/login/dashboard/user-dashboard/${userId}`}
                  className={navLinkClass}
                  aria-current="page"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/login/home/${userId}`}
                  className={navLinkClass}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/about-us/${userId}`}
                  className={navLinkClass}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/login/user-profile/${userId}`}
                  className={navLinkClass}
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CROWD FUNDING
            </span>
          </NavLink>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/register">
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
