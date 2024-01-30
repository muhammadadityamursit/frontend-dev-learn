import axios from "axios";
import React, { useEffect, useState } from "react";

const Tugas6 = () => {
  const [student, setStudent] = useState(null);
  // State Input
  const [input, setInput] = useState({
    name: "", // properti object (disamakan)
    course: "",
    score: 0,
  });

  //   indikator -> membuat real time data
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentid, setcurrentid] = useState(-1);
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

  const handleindexscore = (param) => {
    if (param === null) {
      return "-";
    } else if (param >= 80) {
      return "A";
    } else if (param >= 70 && param < 80) {
      return "B";
    } else if (param >= 60 && param < 70) {
      return "C";
    } else if (param >= 50 && param < 60) {
      return "D";
    } else if (param < 50) {
      return "E";
    }
  };

  // handler handleChange -> menampung input-an ke dalam state
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // console.log(name);

    // setInput berupa object * [name] -> check input-an true  or false
    setInput({ ...input, [name]: value });
  };

  //   handler untuk mengirim data
  const handleSubmit = (e) => {
    e.preventDefault(); // agar tidak nge-refresh dan logic bisa berjalan / kebaca
    console.log(input);
    //destructuring
    let { name, course, score } = input;

    // Logic Update Data -> jika currentid -1 (default) maka akan create data & jika bukan default maka akan update data
    // Post -> Create Data
    // Put -> Update Data
    if (currentid === -1) {
      axios
        .post("https://backendexample.sanbercloud.com/api/student-scores", {
          name,
          course,
          score,
        }) //Data yg dikirimkan
        .then((e) => {
          console.log(e);
          setFetchStatus(true); // true berarti ketika berhasil create data maka akan fetching data lagi
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbercloud.com/api/student-scores/${currentid}`,
          {
            name,
            course,
            score,
          }
        ) //Data yg dikirimkan
        .then((e) => {
          console.log(e);
          setFetchStatus(true); // true berarti ketika berhasil create data maka akan fetching data lagi
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Setelah edit data berhasil, kembalikan menjadi -1 (default lagi) agar tidak tertimpa ketika ada inputan baru
    setcurrentid(-1);
    // Setelah create data set input nya dikembalikkan ke nilai default-nya agar history nilai inputnya tidak ada
    setInput({
      name: "",
      course: "",
      score: 0,
    });
  };

  //handle delete data
  const handleDelete = (e) => {
    let idData = e.target.value;
    axios
      .delete(
        `https://backendexample.sanbercloud.com/api/student-scores/${idData}`
      )
      .then((e) => {
        setFetchStatus(true); // Seteleh delete data berhasil maka akan Fetching data lagi
      });
  };
  // handeEdit -> mengambil data berdasarkan id
  const handleEdit = (e) => {
    let idData = e.target.value;
    console.log(idData);

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
  };
  return (
    <>
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
export default Tugas6;
