import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  // State data
  const [data, setData] = useState(null);

  // Method react untuk fetch data
  useEffect(() => {
    axios
      .get("https://backendexample.sanbercloud.com/api/contestants")

      .then((res) => {
        let result = res.data; // array
        setData(result); // assign data
        console.log(res.data);
      })
      .catch((err) => {
        console.Console.log(err);
      });
  }, []);

  return (
    <>
      <p>Data hasil fetch : </p>
      <ul>
        {data === null && <p>On Progress</p>}
        {data !== null &&
          data.map((element) => {
            return <li key={element.id}>{element.name}</li>;
          })}
        <li>Aditya</li>
        <li>Akharul</li>
      </ul>
    </>
  );
};

export default App;
