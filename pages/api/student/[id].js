import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  console.log(req);

  const token = req.headers["x-access-token"]

  try {
    const authenticatedStudent = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const data = await db
      .collection("students")
      .find({ rollNo: authenticatedStudent })
      .toArray();

    const selectedClasses = data[0].classes;

    if (!selectedClasses) {
      return res.send({ message: "Fetch error" });
    }

    if (selectedClasses) {
      //   console.log("Voila les classes selectionner", selectedClasses);
      return res.status(200).json(selectedClasses);
    }
  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }
}
