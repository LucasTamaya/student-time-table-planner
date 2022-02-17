import { useEffect, useState } from "react";
import CourseWidget from "../components/CourseWidget";
import Navbar from "../components/Navbar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
const axios = require("axios");

export default function Courses() {
  const [allCourses, setAllCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetching = async () => {
    // envoit de la requete vers l'api + vérification du JWT
    const res = await fetch("http://localhost:3000/api/courses", {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    });

    const data = await res.json();

    console.log(data);

    // si problème avec le JWT, on alerte l'utilisateur
    if (data.message === "JWT error") {
      setError(!error);
      setLoading(!loading);
    } else {
      setAllCourses(data);
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
        {/* Loading message le temps de la réception des données */}
        {loading && (
          <div className="flex h-screen w-screen absolute top-0 justify-center items-center gap-x-2">
            <h2 className="text-center text-4xl font-bold">Loading</h2>
            <AutorenewIcon className="animate-spin text-4xl" />
          </div>
        )}

        {/* Si erreur dans la réception de données */}
        {error && (
          <div className="flex w-full h-full justify-center items-center">
            <h2 className="text-2xl font-bold text-center">
              Error, you must be connected
            </h2>
          </div>
        )}

        {/* Si réception de données réussi */}
        {allCourses && (
          <div>
            <h1 className="text-center text-2xl font-bold">All Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 md lg:grid-cols-3">
              {allCourses.map((courses) => (
                <CourseWidget
                  name={courses.name}
                  id={courses._id}
                  key={courses._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const res = await axios.get("http://localhost:3000/api/courses");
//   const data = await res.data;

//   return {
//     props: {
//       data: data,
//     },
//   };
// };
