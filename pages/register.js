import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";
const axios = require("axios");

export default function Register() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [logMessage, setLogMessage] = useState("");

  const router = useRouter();

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
        console.log(res);
        // si pas d'erreur, message de connexion réussi + enregistrement du JWT dans le localStorage
        if (res.data.error === false) {
          setLogMessage("Successfull connexion");
          localStorage.setItem("accessToken", res.data.accessToken);
          router.push("/courses");
          // sinon, message d'erreur
        } else {
          setLogMessage("Something went wrong");
        }
      });
  }
  return (
    <>
      <Navbar />
      <div>
        <h1 className="font-bold text-4xl text-center">Register page</h1>
        <div className="w-screen flex justify-center mt-10">
          <form className="w-72 sm:w-96 flex flex-col">
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
              className="bg-blue-400 px-3 py-1 m-2 rounded-sm text-white font-semibold hover:bg-blue-500 cursor-pointer"
              type="submit"
              onClick={handleForm}
              value="Register"
            />
          </form>
        </div>

        {logMessage && <p>{logMessage}</p>}
      </div>
    </>
  );
}
