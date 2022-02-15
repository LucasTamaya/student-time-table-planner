const axios = require("axios");
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Footer from "../components/Footer";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState();
  const [loading, setLoading] = useState(true);

  const deleteClass = async (classeId) => {
    // créer une nouvelle liste de classe avec la classe supprimer en moins
    const updateClasses = myClasses.filter((x) => x._id != classeId);
    // met a jour la liste des classes à afficher coté frontend
    setMyClasses(updateClasses);
    const deleteClass = await axios.delete(
      `http://localhost:3000/api/class/${localStorage.getItem(
        "accessToken"
      )}/${classeId}`
    );
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/class/${localStorage.getItem("accessToken")}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMyClasses(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl text-center font-bold mb-10">My Classes</h1>

        {loading && (
          <div className="flex h-screen w-screen absolute top-0 justify-center items-center gap-x-2">
            <h2 className="text-center text-4xl font-bold">Loading</h2>
            <AutorenewIcon className="animate-spin text-4xl" />
          </div>
        )}

        {myClasses && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
            {myClasses.map((classe) => (
              <div
                key={classe._id}
                className="bg-blue-500 w-72 h-72 mx-auto p-4 flex flex-col justify-center items-center gap-y-4 items-center rounded hover:shadow-2xl shadow-black-900"
              >
                <h2 className="text-white text-xl font-bold">{classe.faculty} Class</h2>
                <p className="text-white">{classe.day}</p>
                <p className="text-white">
                  From {classe.from} to {classe.to}
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
        )}
      </div>
      <Footer />
    </>
  );
}
