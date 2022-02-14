const axios = require("axios");
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  // fonction a fin de rafraîchir nos props à chaque ajout ou suppression
  const refreshData = () => {
    router.replace(router.asPath);
  };

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
        <h1 className="text-2xl font-bold">My Classes</h1>
        <Link href="/courses">View all courses</Link>

        {loading && <h1>Loading data ...</h1>}

        {myClasses &&
          myClasses.map((classe) => (
            <div
              key={classe._id}
              className="border border-black w-60 mx-auto my-10 p-4 flex flex-col items-center rounded"
            >
              <h2>{classe.faculty}</h2>
              <p>{classe.day}</p>
              <p>
                From {classe.from} to {classe.to}
              </p>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-xl cursor-pointer"
                onClick={() => deleteClass(classe._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
