import { useEffect, useState } from "react";
const axios = require("axios");

const Classes = ({ data, selectedClasses }) => {
  // const [obj, setObj] = useState([]) onClick={() => setObj([...obj, classe])}
  const [newClasses, setNewClasses] = useState([]);

  useEffect(() => {
    // récupère les classes deaj selectionnées
    fetch(`http://localhost:3000/api/student/${localStorage.getItem("accessToken")}`)
      .then(res => res.json())
      .then(data => setNewClasses(data))
      .catch(err => console.log(err))
  }, []);

  const addClass = async (id) => {

    setNewClasses([...newClasses, id])
    
    const newClass = await axios.post(
      `http://localhost:3000/api/classes/${localStorage.getItem(
        "accessToken"
      )}`,
      {
        classId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    // const res = await newClass.data.msg;
    if (newClass.data.msg === false) {
      console.log("error dans l'updata de la classe");
    } else {
      console.log("succes");
    }
  };

  return (
    <>
      {newClasses.length === 0 ? (
        <p>No classes selected yet</p>
      ) : (
        newClasses.map((classes) => (
          <ul>
            <li>{classes}</li>
          </ul>
        ))
      )}
      {selectedClasses && selectedClasses.map((x) => console.log(x))}
      {data &&
        data.map((classe) => (
          <div
            className="border border-black rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5"
            key={classe._id}
          >
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
