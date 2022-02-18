import { connectToDatabase } from "../../../util/mongodb";
import { nextCors } from "../../../util/cors";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  // console.log(req);

  const token = req.headers["x-access-token"];

  //   si méthode GET
  if (req.method === "GET") {
    try {
      const authenticatedStudent = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      const courseCode = req.query.id;

      const classes = await db
        .collection("classes")
        .find({ courseCode: courseCode })
        .toArray();

      // si erreur pendant le fetch
      if (!classes) {
        res.send({ message: "Fetch error" });
      }
      // si pas d'erreur on renvoit la data au frontend
      if (classes) {
        res.status(200).json(classes);
      }
      // si erreur avec JWT
    } catch (err) {
      console.log(err);
      return res.send({ message: "JWT error" });
    }
  }

  // sinon, si méthode POST
  else {
    console.log(req.body);
    //   récupération accessToken
    const accessToken = req.query.id;

    // récupération id de la classe
    const { currentClasses } = req.body;

    const authenticatedStudent = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (authenticatedStudent) {
      console.log("rollNo:", authenticatedStudent);

      const filter = { rollNo: authenticatedStudent };

      const newClass = { $set: { classes: currentClasses } };

      const updateClass = await db
        .collection("students")
        .updateOne(filter, newClass);
      if (updateClass) {
        console.log("class update avec succes");
        res.status(200).send({ error: false });
      } else {
        res.status(200).send({ error: true });
      }
    } else {
      console.log("JWT error signature");
    }
  }
}
