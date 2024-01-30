import React from "react";
import Cookies from "js-cookie";

const Dasboard = () => {
  const user = JSON.parse(Cookies.get("user")); // ubah string ke Object
  console.log(user);
  return <div>Welcome back, {user.name}</div>;
};

export default Dasboard;
