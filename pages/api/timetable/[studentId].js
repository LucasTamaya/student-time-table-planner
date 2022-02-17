import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   console.log(req);

  const token = req.headers["x-access-token"];

  try {
    const authenticatedStudent = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    //   classes sélectionnées par l'etudiant
    const dataOne = await db
      .collection("students")
      .find({ rollNo: authenticatedStudent })
      .toArray();

    //   toutes les classes
    const dataTwo = await db.collection("classes").find({}).toArray();

    // si erreur dans le fetch
    if (!dataOne && !dataTwo) {
      console.log("erreur pendant le fetch");
      return res.send({ message: "Fetch error" });
    }

    // si aucune erreur
    if (dataOne && dataTwo) {
      // conversion de la data brute
      const selectedClassesId = dataOne[0].classes.map(
        (x) => new mongodb.ObjectId(x)
      );

      //   tableau qui va contenir l'ensemble des propriétés des classes sélectionnées
      const result = [];

      //   compare les classes id selectionner avec l'ensemble des classes
      selectedClassesId.map((x) => {
        dataTwo.map((y) => {
          // si l'id est identique, on ajoute la classe au tableau
          if (JSON.stringify(y._id) === JSON.stringify(x)) {
            result.push(y);
          }
        });
      });
      //   on renvoit le tableau au front
      // console.log(result);
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }
}
