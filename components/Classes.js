import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PopUp from "./PopUp";
const axios = require("axios");

const Classes = ({ data }) => {
  const [currentClasses, setCurrentClasses] = useState([]); //tableau vide sinon
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    // récupère les classes deja selectionnées dans la base donnée
    fetch(
      `http://localhost:3000/api/student/${localStorage.getItem("accessToken")}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentClasses(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedClasses = async (id) => {
    // si on tente d'ajouter une classe déja sélectionné, on ouvre la popup
    if (currentClasses.includes(id)) {
      setPopUp(!popUp);
      // si la classe n'a pas encore été sélectionné, on l'ajoute au tableau de classes à ajouter
    } else {
      setCurrentClasses([...currentClasses, id]);
      console.log(currentClasses);
    }
  };

  // ajoute une nouvelle classe dans la base de donnée
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

  const deleteClass = (id) => {
    const newClasses = currentClasses.filter((x) => x != id);
    setCurrentClasses(newClasses);
  };

  return (
    <>
      <Navbar />
      <PopUp popUp={popUp} setPopUp={setPopUp}/>
      {loading && (
        <div className="flex justify-center items-center gap-x-2">
          <h2 className="text-center text-4xl font-bold">Loading</h2>
          <AutorenewIcon className="animate-spin text-4xl" />
        </div>
      )}

      {/* {currentClasses.length === 0 && (
        <h2>You haven't selected any classes yet</h2>
      )} */}

      {currentClasses.length > 0 && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Selected Classes</h2>
          {currentClasses.map((x) => (
            <div className="flex justify-center items-center mb-2 p-2 rounded-3xl border border-blue-500 gap-x-2 group">
              <p className="">{x}</p>
              <CloseIcon
                className="text-blue-500 cursor-pointer"
                onClick={() => deleteClass(x)}
              />
            </div>
          ))}
          <button
            className="bg-blue-400 p-2 rounded-lg text-white hover:bg-blue-500"
            onClick={addToDataBase}
          >
            Add classes
          </button>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((classe) => (
            <div
              className="bg-blue-500 rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5 hover:shadow-2xl shadow-black-900"
              key={classe._id}
            >
              <h1 className="text-2xl font-bold text-white">
                {classe.faculty} Class
              </h1>
              <p className="text-white">{classe.day}</p>
              <p className="text-white">
                From {classe.from} to {classe.to}{" "}
              </p>
              <button
                className="transition ease-out border border-white text-white p-2 rounded-xl hover:scale-105"
                onClick={() => selectedClasses(classe._id)}
              >
                Select this class
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Classes;
