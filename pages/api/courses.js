import { connectToDatabase } from "../../util/mongodb"; //connexion à mongoDB optimisé
import NextCors from "nextjs-cors";
const jwt = require("jsonwebtoken")

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const token = req.headers["x-access-token"];

  try{
    const authenticatedStudent = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const allCourses = await db.collection("courses").find({}).toArray();
    return res.status(200).json(allCourses)

  } catch(err){
    console.log(err)
    res.json({message: "JWT error"})
  }
}
