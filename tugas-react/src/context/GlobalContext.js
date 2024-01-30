import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Setup file context
export const GlobalContext = createContext();

// Setup provider file context
export const GlobalProvider = (props) => {
  // DeklarasiuseNavigate
  let navigate = useNavigate();
  // State
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
  //create data
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
          navigate("/code-materi");
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
          navigate("/code-materi");
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
    navigate(`/edit/${idData}`);

    // axios
    //   .get(
    //     `https://backendexample.sanbercloud.com/api/student-scores/${idData}`
    //   )
    //   .then((e) => {
    //     let data = e.data;
    //     console.log(data); // agar dapat di edit oleh user-nya

    //     setcurrentid(data.id); // assigment (indikator)
    //     setInput({
    //       name: data.name,
    //       course: data.course,
    //       score: data.score,
    //     });
    //   });
  };

  let state = {
    student,
    setStudent,
    input,
    setInput,
    fetchStatus,
    setFetchStatus,
    currentid,
    setcurrentid,
  };

  let handleFunction = {
    handleindexscore,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  };
  return (
    // State diatas dimasukkan ke dalam value sebagai object
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
