import {connectToDatabase} from "../../../../util/mongodb"
import NextCors from "nextjs-cors";
// import { ObjectId } from "mongodb";
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const accessToken = req.query.studentId;
  const authenticatedStudent = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (authenticatedStudent) {
    //   classes sélectionnées par l'etudiant
    const dataOne = await db
      .collection("students")
      .find({ rollNo: authenticatedStudent })
      .toArray();

    //   toutes les classes
    const dataTwo = await db.collection("classes").find({}).toArray();

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
            // console.log("valeur egale !!!!");
            // sinon on ne fait rien
          } else {
            // console.log("valeur: ", typeof y._id, "filtre: ", typeof x);
            // console.log("valeur differente");
          }
        });
      });
      //   on renvoit le tableau au front
      return res.status(200).json(result);
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