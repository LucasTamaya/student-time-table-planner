const axios = require("axios");
import { useState, useEffect } from "react";

export default function MyClasses() {
  const [classes, setClassses] = useState();

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/class/${localStorage.getItem("accessToken")}`
    )
      .then((res) => res.json())
      .then((data) => setClassses(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>
        {classes && (
          <div>
            {classes.map((x) => (
              <div key={x}>
                <p>{x}</p>
              </div>
            ))}
            <h2>Number of classes per week:</h2>
            <p>{classes.length}</p>
          </div>
        )}
      </div>
    </>
  );
}
