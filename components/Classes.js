import { useEffect, useState } from "react";
const axios = require("axios");

const Classes = ({ data }) => {
  // const [obj, setObj] = useState([]) onClick={() => setObj([...obj, classe])}
  const [currentClasses, setCurrentClasses] = useState([]);

  useEffect(() => {
    // récupère les classes deaj selectionnées
    fetch(
      `http://localhost:3000/api/student/${localStorage.getItem("accessToken")}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentClasses(data))
      .catch((err) => console.log(err));
  }, []);

  const selectedClasses = async (id) => {
    // si on tente d'ajouter une classe déja sélectionné
    if (currentClasses.includes(id)) {
      alert("You have already selected this class");
      // si la classe n'a pas encore été sélectionné, on l'ajoute au tableau de classes à ajouter
    } else {
      setCurrentClasses([...currentClasses, id]);
      console.log(currentClasses)
    }
  };

  const addToDataBase = async () => {
    const addSelectedClasses = await axios.post(
      `http://localhost:3000/api/classes/${localStorage.getItem(
        "accessToken"
      )}`,
      {
        currentClasses: currentClasses,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    // const res = await newClass.data.msg;
    if (addSelectedClasses.data.msg === false) {
      console.log("error dans l'update de la classe");
    } else {
      console.log("succes");
    }
  };

  return (
    <>
      {currentClasses.length === 0 ? (
        <p>No classes selected yet</p>
      ) : (
        <div>
          {currentClasses.map((classes) => (
            <ul>
              <li>{classes}</li>
            </ul>
          ))}
          <button
            className="border border-black p-2 rounded"
            onClick={addToDataBase}
          >
            Add classes
          </button>
        </div>
      )}
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
              onClick={() => selectedClasses(classe._id)}
            >
              Select this class
            </button>
          </div>
        ))}
    </>
  );
};

export default Classes;
