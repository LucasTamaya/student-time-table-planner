import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const accessToken = req.query.id;
  const authenticatedStudent = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (authenticatedStudent) {
    const data = await db
      .collection("students")
      .find({ rollNo: authenticatedStudent })
      .toArray();
    if (data) {
      const classes = data[0].classes;
      console.log("réussi !", classes);
      return res.status(200).json(classes);
    } else {
      console.log("erreur in the fetch");
      return res.status(500);
    }
  }

  if (!authenticatedStudent) {
    console.log("erreur in the fetch");
    return res.status(500);
  }
}
