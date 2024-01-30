import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ListJob = () => {
  // real time data
  const [currentid, setcurrentid] = useState(-1);
  const [fetchStatus, setFetchStatus] = useState(true); // fetching data bernilai true
  // State penampung data
  const [data, setData] = useState(null);
  // State Input
  const [input, setInput] = useState({
    job_type: "", // properti object (disamakan)
    job_tenure: "",
    company_city: "",
  });

  // Fetching Data
  const fetchData = () =>
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);

        //  setData(data);
      });

  useEffect(() => {
    if (fetchStatus === true) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]); // kurung kota agar tidak infinbity rendering
  // console.log(data);

  // handler handleChange -> menampung input-an ke dalam state
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // console.log(name);

    // setInput berupa object * [name] -> check input-an true  or false
    setInput({ ...input, [name]: value });
  };

  // Handle Submit
  const handleSubmit = (event) => {
    event.prevenDefault();
    let { job_type, job_tenure, company_city } = input;

    // Logic Update Data -> jika currentid -1 (default) maka akan create data & jika bukan default maka akan update data
    // Post -> Create Data
    // Put -> Update Data
    if (currentid === -1) {
      axios
        .post(
          `https://dev-example.sanbercloud.com/api/job-vacancy`,
          { name: input.name },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } },
          {
            company_city,
            job_type,
            job_tenure,
          }
        ) //Data yg dikirimkan
        .then((e) => {
          let { token, user } = data;
          console.log(token);
          console.log(user);
          Cookies.set("token", token, { expires: 1 }); // menyimpan token ke dalam cookies
          Cookies.set("user", JSON.stringify(user), { expires: 1 }); // menyimpan user ke dalam cookies (object-nya di ubah ke bentuk String)
          // navigate("/");
          console.log(e);
          setFetchStatus(true); // true berarti ketika berhasil create data maka akan fetching data lagi
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${currentid}`,
          {
            company_city,
            job_type,
            job_tenure,
          }
        ) //Data yg dikirimkan
        .then((e) => {
          let { token, user } = data;
          console.log(token);
          console.log(user);
          Cookies.set("token", token, { expires: 1 }); // menyimpan token ke dalam cookies
          Cookies.set("user", JSON.stringify(user), { expires: 1 }); // menyimpan user ke dalam cookies (object-nya di ubah ke bentuk String)
          console.log(e);
          setFetchStatus(true); // true berarti ketika berhasil create data maka akan fetching data lagi
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setcurrentid(-1);
    setInput({
      job_type: "",
      job_tenure: "",
      company_name: "",
    });
  };

  //handle delete data
  const handleDelete = (e) => {
    let idData = e.target.value;
    axios
      .delete(
        `https://dev-example.sanbercloud.com/api/job-vacancy/${idData},`,
        { name: input.name },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((e) => {
        let { token, user } = data;
        console.log(token);
        console.log(user);
        Cookies.set("token", token, { expires: 1 }); // menyimpan token ke dalam cookies
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
        console.log(e);
        setFetchStatus(true); // Seteleh delete data berhasil maka akan Fetching data lagi
      });
  };

  // handeEdit -> mengambil data berdasarkan id
  const handleEdit = (e) => {
    let idData = e.target.value;
    console.log(idData);

    axios
      .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
      .then((e) => {
        let data = e.data;
        console.log(data); // agar dapat di edit oleh user-nya
        let { token, user } = data;
        console.log(token);
        console.log(user);
        Cookies.set("token", token, { expires: 1 }); // menyimpan token ke dalam cookies
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
        console.log(e);
        setFetchStatus(true); // Seteleh delete data berhasil maka akan Fetching data lagi
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Job Type
              </th>
              <th scope="col" className="px-6 py-3">
                Job Tenure
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((e, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{e.company_city}</td>
                    <td className="px-6 py-4">{e.job_type}</td>
                    <td className="px-6 py-4">{e.job_tenure}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={handleDelete}
                        value={e.id}
                        className="text-red-600"
                      >
                        Delete
                      </button>{" "}
                      <button
                        // onClick={handleEdit}
                        // value={e.id}
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
            Company Name
          </label>
          <input
            onChange={handleChange}
            value={input.company_name}
            name="company_city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Company_City"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Type
          </label>
          <input
            onChange={handleChange}
            value={input.job_type}
            name="job_type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Job type"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Tenure
          </label>
          <input
            onChange={handleChange}
            value={input.job_tenure}
            name="job_tenure"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Job_Tenure"
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

export default ListJob;
