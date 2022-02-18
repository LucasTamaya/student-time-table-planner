//connexion à mongoDB optimisé
import { connectToDatabase } from "../../util/mongodb";
import { nextCors } from "../../util/cors";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // middle type CORS
  await nextCors(req, res);

  const newClass = await db.collection("classes").insertOne({
    courseCode: "620e22cb5fd8351089522981",
    faculty: "Volley Ball",
    start: new Date(2022, 0, 7, 10),
    end: new Date(2022, 0, 7, 11),
  });

  // console.log(newClass);
  const date = new Date(2022, 0, 4, 7);

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hour = date.getHours();

  const day = week[date.getDay()];

  res.json(newClass);
}
