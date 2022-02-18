import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
const template = require("../util/template")
const axios = require("axios");

export default function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [logMessage, setLogMessage] = useState("");

  const router = useRouter();

  function handleForm(event) {
    event.preventDefault();
    axios
      .post(`${template}api/auth/login`, {
        rollNo: rollNo,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error === false) {
          setLogMessage("Successfull connexion");
          localStorage.setItem("accessToken", res.data.accessToken);
          router.push("/courses");
        } else {
          setLogMessage("Something went wrong");
        }
      });
  }
  return (
    <>
      <Navbar />
      <div>
        <h1 className="font-bold text-4xl text-center">Login page</h1>
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
              value="Login"
            />
          </form>
        </div>
        {logMessage && <p>{logMessage}</p>}
      </div>
    </>
  );
}
