import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  // State penampung data //null adalah default state
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      });
  }, []);

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
    <>
      <div className="mt-5 mb-10 flex flex-col items-center font-bold text-yellow-500">
        <h1>Find Your Jobs :</h1>
      </div>
      <div className="m-3 flex flex-wrap gap-6 justify-center">
        {data !== null &&
          data.map((res) => {
            return (
              <div
                key={res.id}
                className="w-full flex flex-col max-w-sm h-97 p-4 overflow-hidden bg-white shadow-lg rounded-xl dark:bg-gray-800"
              >
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="flex items-center justify-start flex-grow w-full">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src={res.company_image_url}
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </a>
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
                <div className="flex items-center justify-between p-2 my-6 bg-yellow-100 rounded">
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
                    <span className="flex-none px-3 py-1 text-sm text-yellow-500 border border-yellow-500 rounded-full">
                      {res.job_tenure}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
