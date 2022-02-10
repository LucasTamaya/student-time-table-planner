import { useState } from "react";
import { useRouter } from "next/router";
const axios = require("axios");

export default function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [logMessage, setLogMessage] = useState("");

  const router = useRouter();

  function handleForm(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", {
        rollNo: rollNo,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error === false) {
          setLogMessage("Successfull connexion");
          router.push("/courses")
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
        {logMessage && <p>{logMessage}</p>}
      </div>
    </>
  );
}
