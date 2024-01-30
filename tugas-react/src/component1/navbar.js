import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  let navigate = useNavigate();
  return (
    <>
      <ul>
        <li>
          {" "}
          <Link to={"/"}>Home</Link>
        </li>
        {!Cookies.get("token") && (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
        {Cookies.get("token") && (
          <li>
            <span
              onClick={() => {
                Cookies.remove("token"); // ketika sdah login akan kembali ke halaman logout
                navigate("/login");
              }}
            >
              Logout
            </span>
          </li>
        )}
        {/* <li>
          {" "}
          <Link to="/code-materi">Code Materi</Link>
        </li>
        <li>
          {" "}
          <Link to="/create">CreateData</Link>
      </li> */}
      </ul>
    </>
  );
};

export default Navbar;
