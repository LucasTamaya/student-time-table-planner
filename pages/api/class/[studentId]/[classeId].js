import { connectToDatabase } from "../../../../util/mongodb";
// import NextCors from "nextjs-cors";
import { nextCors } from "../../../../util/cors";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  //   JWT
  const token = req.headers["x-access-token"];

  try {
    const authenticatedStudent = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    //   id de la classe a supprimer
    const classeId = req.query.classeId;

    //   retire la classe du tableau
    const deleteClass = await db.collection("students").updateOne(
      { rollNo: authenticatedStudent },
      {
        $pull: {
          classes: classeId,
        },
      }
    );

    if (!deleteClass) {
      console.log("erreur dans la supression du post");
      return res.send({ message: "error" });
    }

    if (deleteClass) {
      console.log("classe supprimer avec succes");
      return res.status(200).send({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }
}
