import Hero from "../../ComponentFinal/Hero";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  //state penampung data

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      });
  }, []); // kurung kota agar tidak infinbity rendering
  console.log(data);

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

  return (
    <div className="container mx-auto p-4">
      <Hero />
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
          data
            .filter((res, index) => {
              return index < 3;
            })
            .map((res) => {
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

export default Home;
