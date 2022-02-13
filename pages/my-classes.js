const axios = require("axios");
import { useState, useEffect } from "react";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState();
  const [loading, setLoading] = useState(true);

  const deleteClass = async (id) => {

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
      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>

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
              <button className="bg-red-500 text-white px-3 py-1 rounded-xl cursor-pointer" onClick={() => deleteClass(classe._id)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}
