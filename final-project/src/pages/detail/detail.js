import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  // State data
  const [data, setData] = useState(null);

  // Menangkap ID data
  let { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`)
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        });
    }
  }, [id]);

  console.log(data);

  return (
    <>
      <div className="border p-6 w-1/2 mx-auto justify-items-center">
        <div className="border py-4 mx-autov text-center font-bold">
          {data?.company_name}
        </div>
        <div className="border py-2 text-left ">{data?.job_description}</div>
        <div className="border py-2 text-left">{data?.job_qualification}</div>
        <div className="border py-2 text-left">{data?.job_type}</div>
        <div className="border py-2 text-left">{data?.job_tenure}</div>
        <div className="border py-2 text-left">{data?.job_status}</div>
        <div className="border py-2 text-left">{data?.company_city}</div>
      </div>
    </>
  ); // ? adalah conditional dari javascript
};

export default Detail;
