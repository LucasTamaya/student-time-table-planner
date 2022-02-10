import { useState } from "react";
const axios = require("axios");

export default function Register() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [logMessage, setLogMessage] = useState("");

  function handleForm(event) {
    event.preventDefault();
    // enregistre nouvel etudiant
    axios
      .post("http://localhost:3000/api/auth/register", {
        rollNo: rollNo,
        name: name,
        classes: [],
        password: password,
      })
      .then((res) => {
        console.log(res)
        // si pas d'erreur, message de connexion réussi + enregistrement du JWT dans le localStorage
        if (res.data.error === false) {
          setLogMessage("Successfull connexion");
          localStorage.setItem("accessToken", res.data.accessToken)
          // sinon, message d'erreur
        } else {
          setLogMessage("Something went wrong");
        }
      });
  }
  return (
    <>
      <div>
        <form>
          <input
            className="px-3 py-1 m-2 border border-black"
            type="text"
            name="rollNumber"
            placeholder="Your Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <input
            className="px-3 py-1 m-2 border border-black"
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-3 py-1 m-2 border border-black"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-blue-500 px-3 py-1 rounded-sm text-white font-semibold"
            type="submit"
            onClick={handleForm}
            value="Register"
          />
        </form>

        {logMessage && (
          <p>{logMessage}</p>
        )}
      </div>
    </>
  );
}
