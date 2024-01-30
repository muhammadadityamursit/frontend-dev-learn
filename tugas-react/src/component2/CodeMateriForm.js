import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";

const CodeMateriForm = () => {
  let { idData } = useParams();
  // console.log(idData);
  const { state, handleFunction } = useContext(GlobalContext);
  const {
    setStudent,
    input,
    setcurrentid,
    setInput,
    fetchStatus,
    setFetchStatus,
    currentid,
  } = state;

  const { handleChange, handleSubmit } = handleFunction;
  // Fetching Data
  const fetchData = () =>
    axios
      .get("https://backendexample.sanbercloud.com/api/student-scores")
      .then((a) => {
        let data = a.data;
        // console.log(data);

        setStudent(data);
      });

  //   jika fetchsatus bernilai true maka akan fetching data
  useEffect(() => {
    if (idData !== undefined) {
      axios
        .get(
          `https://backendexample.sanbercloud.com/api/student-scores/${idData}`
        )
        .then((e) => {
          let data = e.data;
          console.log(data); // agar dapat di edit oleh user-nya

          setcurrentid(data.id); // assigment (indikator)
          setInput({
            name: data.name,
            course: data.course,
            score: data.score,
          });
        });
    }
  }, []); // menjalankan kondisional kedua kalinya (depedensi untuk menjalankan kondisional)
  // console.log(currentid);

  return (
    <>
      <form className="w-1/2 m-auto" onSubmit={handleSubmit} method="POST">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            value={input.name}
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mata Kuliah
          </label>
          <input
            onChange={handleChange}
            value={input.course}
            name="course"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mata Kuliah"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nilai
          </label>
          <input
            onChange={handleChange}
            value={input.score}
            name="score"
            type={"number"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nilai"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default CodeMateriForm;
