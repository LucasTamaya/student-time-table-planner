import { connectToDatabase } from "../../util/mongodb"; //connexion à mongoDB optimisé
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const courses = await db.collection("courses").find({}).toArray();

  if (courses) {
      console.log(courses)
    res.status(200).json(courses);
  } else {
    res.status(500).send({ error: true });
  }
}
