import { connectToDatabase } from "../../../../util/mongodb";
import NextCors from "nextjs-cors";
// import { ObjectId } from "mongodb";
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  //   JWT
  const accessToken = req.query.studentId;
  //   id de la classe a supprimer
  const classeId = req.query.classeId;

  //   vérification du JWt
  const authenticatedStudent = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  //   si JWT valide
  if (authenticatedStudent) {
    //   retire la classe du tableau
    const deleteClass = await db.collection("students").updateOne(
      { rollNo: authenticatedStudent },
      {
        $pull: {
          classes: classeId,
        },
      }
    );
    // si suppression réussi, on renvoit une nouvelle version des classes à afficher
    if(deleteClass){
        console.log(deleteClass)
        return res.status(200)
    }
  }

  // si JWT non valide
  if (!authenticatedStudent) {
    console.log("erreur with the JWT");
    return res.status(500);
  }
}
