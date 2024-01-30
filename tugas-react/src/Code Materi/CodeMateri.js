import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const CodeMateri = () => {
  const { state, handleFunction } = useContext(GlobalContext);
  const {
    student,
    setStudent,

    fetchStatus,
    setFetchStatus,
    currentid,
  } = state;

  const {
    handleindexscore,

    handleDelete,
    handleEdit,
  } = handleFunction;
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
    if (fetchStatus === true) {
      fetchData();
      setFetchStatus(false); // balikin ke false lagi agar tidak infinity rendering
    }
  }, [fetchStatus, setFetchStatus]); // menjalankan kondisional kedua kalinya (depedensi untuk menjalankan kondisional)
  console.log(currentid);

  return (
    <>
      <div>
        <Link to="/create">
          <button>ke halaman create data</button>
        </Link>
      </div>
      <div className="relative overflow-x-auto w-1/2 border m-auto mt-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Mata Kuliah
              </th>
              <th scope="col" className="px-6 py-3">
                Nilai
              </th>
              <th scope="col" className="px-6 py-3">
                Index Nilai
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {student !== null &&
              student.map((e, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{e.name}</td>
                    <td className="px-6 py-4">{e.course}</td>
                    <td className="px-6 py-4">{e.score}</td>
                    <td className="px-6 py-4">{handleindexscore(e.score)}</td>
                    <td>
                      <button
                        onClick={handleDelete}
                        value={e.id}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleEdit}
                        value={e.id}
                        className="text-blue-600 ml-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CodeMateri;
