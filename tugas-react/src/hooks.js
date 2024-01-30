import React from "react";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("john");

  const handleChangeName = () => {
    setName("Doe");
  };

  return (
    <div className="card">
      <h1>{name}</h1>
      <button onClick={handleChangeName}>ganti nama</button>
    </div>
  );
};

export default App;
