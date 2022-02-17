const axios = require("axios");
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Footer from "../components/Footer";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const deleteClass = async (classeId) => {
    // créer une nouvelle liste de classe avec la classe supprimer en moins
    const updateClasses = myClasses.filter((x) => x._id != classeId);

    // met a jour la liste des classes à afficher coté frontend
    setMyClasses(updateClasses);
    // const deleteClass = await axios.delete(
    //   `http://localhost:3000/api/class/${localStorage.getItem(
    //     "accessToken"
    //   )}/${classeId}`
    // );
    const res = await fetch(
      `http://localhost:3000/api/class/${localStorage.getItem(
        "accessToken"
      )}/${classeId}`,
      {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      }
    );

    const data = await res.json();

    if (data.message === "error") {
      setDeleteMessage("Something went wrong when deleting this class");
    }

    if (data.message === "ok") {
      setDeleteMessage("Delete successfully");
    }
  };

  const fetching = async () => {
    const res = await fetch(
      `http://localhost:3000/api/class/${localStorage.getItem("accessToken")}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      }
    );

    const data = await res.json();
    // si erreur avec le JWT
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
      setMyClasses(data);
      setLoading(!loading);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {loading && (
          <div className="flex h-screen w-screen absolute top-0 justify-center items-center gap-x-2">
            <h2 className="text-center text-4xl font-bold">Loading</h2>
            <AutorenewIcon className="animate-spin text-4xl" />
          </div>
        )}

        {errorMessage && (
          <h2 className="text-2xl text-center font-bold">{errorMessage}</h2>
        )}

        {deleteMessage && (
          <h2
            className={`${
              deleteMessage === "error"
                ? "text-xl absolute bottom-0 right-0 m-20 text-red-500 border border-red-500 p-2 rounded"
                : "text-xl absolute bottom-0 right-0 m-20 text-green-500 border border-green-500 p-2 rounded"
            }`}
          >
            {deleteMessage}
          </h2>
        )}

        {}

        {myClasses && (
          <div>
            <h1 className="text-2xl text-center font-bold mb-10">My Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
              {myClasses.map((classe) => (
                <div
                  key={classe._id}
                  className="bg-blue-500 w-72 h-72 mx-auto p-4 flex flex-col justify-center items-center gap-y-4 items-center rounded hover:shadow-2xl shadow-black-900"
                >
                  <h2 className="text-white text-xl font-bold">
                    {classe.faculty} Class
                  </h2>
                  <p className="text-white">
                    {week[new Date(classe.start).getDay()]}
                  </p>
                  <p className="text-white">
                    From {new Date(classe.start).getHours()}am to{" "}
                    {new Date(classe.end).getHours()}am
                  </p>
                  <button
                    className="bg-red-400 text-white px-3 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                    onClick={() => deleteClass(classe._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}
