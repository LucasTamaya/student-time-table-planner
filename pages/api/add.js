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
    courseCode: "62040c6a1155f125a51e2857",
    faculty: "Vocabulary",
    start: new Date(2022, 0, 5, 13),
    end: new Date(2022, 0, 5, 14)
  });

  // console.log(newClass);
  const date = new Date(2022, 0, 4, 7)

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const hour = date.getHours();

  const day = week[date.getDay()]


  res.json(newClass)
}
