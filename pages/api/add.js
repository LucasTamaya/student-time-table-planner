//connexion à mongoDB optimisé
import { connectToDatabase } from "../../util/mongodb";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // // middle type CORS
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const newClass = await db.collection("classes").insertOne({
    courseCode: "62040ce41155f125a51e2859",
    faculty: "Economy",
    day: "Thursday",
    from: "10am",
    to: "11am",
  });

  console.log(newClass);

  res.json(newClass)
}
