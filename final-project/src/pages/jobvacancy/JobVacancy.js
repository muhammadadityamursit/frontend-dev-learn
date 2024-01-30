import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobVacancy = () => {
  const [display, setDisplay] = useState(false); // display aqal bernilai true
  const [fetchStatus, setFetchStatus] = useState(true); // fetching data bernilai true
  const [filterState, setFilterState] = useState(null);
  //state penampung data
  const [data, setData] = useState(null);

  const fetchData = () =>
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      });
  useEffect(() => {
    if (fetchStatus === true) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]); // kurung kota agar tidak infinbity rendering
  // console.log(data);

  const handleText = (e) => {
    if (e === null) {
      return "";
    } else {
      return e.slice(0, 100) + "...";
    }
  };

  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  // State input search
  const [search, setSearch] = useState("");

  const handleChangeSearch = (event) => setSearch(event.target.value);

  const handleSearch = (event) => {
    event.preventDefault(); // Karna form jadi menggunakn preventDeafault agar tidak merefresh
    console.log(search);

    // Filter job Type

    let insertFilterState = (param) => {
      let tmp = [];
      return new Promise((resolve, reject) => {
        param.map((res) => {
          tmp.push({ job_type: res.job_type });
          tmp.push({ job_tenure: res.job_tenure });
          tmp.push({ company_city: res.company_city });
        });

        resolve(tmp);
      });
    };

    let removeDuplicate = (param) => {
      let tmp = []; // penampung array

      return new Promise((resolve, reject) => {
        let tmp = [];

        for (let i of param) {
          if (tmp.indexOf(i.job_type, i.job_tenure, i.company_city) === -1) {
            tmp.push(i.job_type, i.job_tenure, i.company_city);
          }
        }

        resolve(tmp);
      });
    };

    let fetchData = async () => {
      setData(null);
      setDisplay(true);
      let { data } = await axios.get(
        `https://dev-example.sanbercloud.com/api/job-vacancy`
      );
      let b = await insertFilterState(data.data);
      let c = await removeDuplicate(b);
      console.log(data.data);
      console.log(b);
      console.log(c);

      let dataJob = data.data;

      setFilterState([...b]);

      console.log(dataJob);

      let searchData = dataJob.filter((res) => {
        return Object.values(res)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()); // Object : Ubah ke dalam bentuk Array dan join :gabungkan kalimatnya
      });

      console.log(searchData);

      setDisplay(false);
      setData([...searchData]);
      console.log(display);
    };

    fetchData();
    setSearch("");
  };

  // Filter
  const [filter, setFilter] = useState({
    job_type: "",
    job_tenure: "",
    company_city: "",
  });

  const handleChangeFilter = (event) => {
    if (event.target.value !== "Job Type") {
      setFilter({ ...filter, [event.target.name]: event.target.value });
    } else {
      setFilter({ ...filter, [event.target.name]: "" });
    }
  };

  const handleFilter = (event) => {
    event.preventDefault();
    console.log(filter);

    console.log(search);

    let filterData = async () => {
      setData(null);
      setDisplay(true);
      let { data } = await axios.get(
        `https://dev-example.sanbercloud.com/api/job-vacancy`
      );
      let dataJob = data.data;

      console.log(dataJob);

      let filterData = dataJob.filter((res) => {
        return (
          res.job_type === filter.job_type ||
          res.job_tenure === filter.job_tenure ||
          res.company_city === filter.company_city
        ); // karna lebih dari 1 object, gunakan perbandingan operator
      });

      console.log(filterData);

      setDisplay(false);
      setData([...filterData]);
    };

    filterData();
    setSearch("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex ">
        <form onSubmit={handleSearch} className="w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              onChange={handleChangeSearch}
              value={search}
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <button
          className="text-white bg-red-600 rounded-lg w-36 ml-5"
          onClick={() => setFetchStatus(true)}
        >
          Reset Data
        </button>
      </div>

      <div className="flex">
        <div className="w-full">
          <form onSubmit={handleFilter} className="">
            <div className="mb-6 mt-5 ">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Job Type
              </label>
              <select
                name="job_type"
                onChange={handleChangeFilter}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Job Type</option>

                {filterState !== null && (
                  <>
                    {filterState.map((res) => {
                      return (
                        <>
                          <option defaultValue={`${res.job_type}`}>
                            {res.job_type}
                          </option>
                        </>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="mb-6 mt-5">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Job Tenure
              </label>
              <select
                name="job_type"
                onChange={handleChangeFilter}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Job Tenure</option>

                {filterState !== null && (
                  <>
                    {filterState.map((res) => {
                      return (
                        <>
                          <option defaultValue={`${res.job_tenure}`}>
                            {res.job_tenure}
                          </option>
                        </>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Job Tenure
              </label>
              <select
                name="company_city"
                onChange={handleChangeFilter}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Pilih Kota</option>

                {filterState !== null && (
                  <>
                    {filterState.map((res) => {
                      return (
                        <>
                          <option defaultValue={`${res.company_city}`}>
                            {res.company_city}
                          </option>
                        </>
                      );
                    })}
                  </>
                )}
              </select>
            </div>

            <button
              type="submit"
              className=" mx-auto text-white bg-blue-600 rounded-lg w-40 p-2."
            >
              Filter
            </button>
          </form>
        </div>
      </div>
      <div className="mt-5 mb-10 flex flex-col items-center font-bold text-black ">
        <h1>Find Your Jobs :</h1>
      </div>
      <div className="py-4 rounded-xl m-2 flex flex-wrap gap-6 justify-center ">
        {data === null && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {data !== null &&
          data.map((res) => {
            return (
              <Link
                to={`/detail/${res.id}`}
                key={res.id}
                className="w-full flex flex-col max-w-sm h-97 p-4 overflow-hidden bg-white shadow-lg rounded-xl dark:bg-gray-800"
              >
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="flex items-center justify-start flex-grow w-full">
                    <span className="relative block">
                      <img
                        alt="profil"
                        src={res.company_image_url}
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </span>
                    <div className="flex flex-col items-start ml-4">
                      <span className="text-gray-700 dark:text-white">
                        {res.company_name}
                      </span>
                      <span className="text-sm font-light text-gray-400 dark:text-gray-300">
                        {res.company_city}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none hidden md:block ">
                    <span className="w-full px-3 py-1 text-sm text-gray-400 rounded-full">
                      {" "}
                      {res.job_type}
                    </span>
                  </div>
                </div>
                <p className="mt-4 mb-2 text-lg text-gray-800 dark:text-white">
                  {res.title}
                </p>
                <p className="flex flex-grow text-sm font-normal text-gray-400">
                  {handleText(res.job_description)}
                </p>
                <div className="flex items-center justify-between p-2 my-6 bg-blue-100 rounded">
                  <div className="flex items-start justify-between w-full">
                    <p className="flex-grow w-full text-2sm text-gray-700">
                      <span className="font-light text-gray-400 text-md">
                        Rp
                      </span>
                      {formatRupiah(res.salary_min + "")} -{" "}
                      {formatRupiah(res.salary_max + "")}
                      <span className="text-sm font-light text-gray-400">
                        /Month
                      </span>
                    </p>
                    <span className="flex-none px-3 py-1 text-sm text-gray-400 border border-gray-400 rounded-full">
                      {res.job_tenure}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default JobVacancy;
