import { useEffect, useState } from "react";
const axios = require("axios");

const Classes = ({ data }) => {
  // const [obj, setObj] = useState([]) onClick={() => setObj([...obj, classe])}
  const addClass = async (id) => {
    const newClass = await axios.post(
      `http://localhost:3000/api/classes/${localStorage.getItem(
        "accessToken"
      )}`,
      {
        classId: id,
      }
    );
    const res = await newClass.data.msg;
    console.log(res);
  };

  return (
    <>
      {data &&
        data.map((classe) => (
          <div className="border border-black rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5">
            <h1>{classe.faculty} Class</h1>
            <p>{classe.day}</p>
            <p>
              From {classe.from} to {classe.to}{" "}
            </p>
            <button
              className="border border-black p-2 rounded-xl"
              onClick={() => addClass(classe._id)}
            >
              Add this class
            </button>
          </div>
        ))}
    </>
  );
};

export default Classes;
