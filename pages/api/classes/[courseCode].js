import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { courseCode } = req.query;
  console.log(courseCode);

  const classes = await db
    .collection("classes")
    .find({ courseCode: courseCode })
    .toArray();

  if (classes) {
    console.log(classes);
    res.status(200).json(classes);
  } else {
    console.log("error in fetch");
    res.status(500); 
  }
}
