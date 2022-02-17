import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PopUp from "./PopUp";
import Loading from "./Loading";
const axios = require("axios");

const Classes = ({ classes, classesErrorMessage }) => {
  const [currentClasses, setCurrentClasses] = useState([]); //tableau vide sinon
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [popUp, setPopUp] = useState(false);

  const fetching = async () => {
    // récupère les classes deja selectionnées dans la base donnée
    const res = await fetch(
      `http://localhost:3000/api/student/${localStorage.getItem(
        "accessToken"
      )}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      }
    );

    const data = await res.json();

    // si erreur avec JWT
    if (data.message === "JWT error") {
      setErrorMessage("Error, you must be connected");
      setLoading(!loading);
    }
    // si erreur pendant le fetch
    if (data.message === "Fetch error") {
      setErrorMessage("Internal server error during the fetch of the data");
      setLoading(!loading);
    }
    // si aucune erreur
    if (!data.message) {
      setCurrentClasses(data);
      setLoading(!loading);
    }
  };

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetching();
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
          "x-access-token": localStorage.getItem("accessToken"),
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
      <PopUp popUp={popUp} setPopUp={setPopUp} />
      {loading && <Loading />}

      {classesErrorMessage && (
        <h2 className="text-2xl text-center font-bold">
          {classesErrorMessage}
        </h2>
      )}

      {errorMessage && (
        <h2 className="text-2xl text-center font-bold">{errorMessage}</h2>
      )}

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
      {classes && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classe) => (
            <div
              className="bg-blue-500 rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5 hover:shadow-2xl shadow-black-900"
              key={classe._id}
            >
              <h1 className="text-2xl font-bold text-white text-center">
                {classe.faculty} Class
              </h1>
              <p className="text-white">
                {week[new Date(classe.start).getDay()]}
              </p>
              <p className="text-white">
                From {new Date(classe.start).getHours()}am to{" "}
                {new Date(classe.end).getHours()}am
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
