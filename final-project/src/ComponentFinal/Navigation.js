import React from "react";
import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navigation = () => {
  // handle Logout
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar className="container mx-auto" fluid={true} rounded={true}>
        <div className="container flex flex-wrap items-center justify-between mx-auto px-2" />
        <Navbar.Brand to="/navbars">
          <span className=" text-black self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
            <span className="text-yellow-800">YukCari</span>Kerja .
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-black bg-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/job-vacancy"
                className="block py-2 pl-3 pr-4 text-black bg-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Job Vacancy
              </Link>
            </li>

            {!Cookies.get("token") && (
              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-black bg-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            )}

            {Cookies.get("token") && (
              <>
                <li>
                  <Link
                    to="/dasboard"
                    className="block py-2 pl-3 pr-4 text-black bg-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                    Dasboard
                  </Link>
                </li>
                <li>
                  <span
                    onClick={handleLogout}
                    className="block py-2 pl-3 pr-4 text-red-500 bg-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
