import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  //Handle Change
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (e) => {
  //   let name = e.target.value;
  //   let value = e.target.value;

  //   setInput({ ...input, [name]: value });
  // };

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  //Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(input);
    // Destructuring
    let { email, password } = input;

    // User/Authentication
    axios
      .post("https://dev-example.sanbercloud.com/api/login", {
        email,
        password,
      })                    
      .then((e) => {
        let data = e.data;

        let { token, user } = data;
        console.log(token);
        console.log(user);

        Cookies.set("token", token, { expires: 1 }); // menyimpan token ke dalam cookies
        Cookies.set("user", JSON.stringify(user), { expires: 1 }); // menyimpan user ke dalam cookies (object-nya di ubah ke bentuk String)
        navigate("/");
      });
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={handleChange}
                value={input.email}
                name="email"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                onChange={handleChange}
                value={input.password}
                name="password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs"></p>
        </div>
      </div>
    </>
  );
};

export default Login;
