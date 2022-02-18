import { connectToDatabase } from "../../../util/mongodb"; //connexion à mongoDB optimisé
import { nextCors } from "../../../util/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  await nextCors()

  // // middle type CORS
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  const { rollNo, password } = req.body;

  console.log(rollNo);

  const existingStudent = await db
    .collection("students")
    .find({ rollNo: rollNo })
    .toArray();

  if (existingStudent.length >= 1) {
    console.log("etudiant trouvé");
  }

  if (existingStudent.length === 0) {
    console.log("etudiant non trouvé");
    return res.status(200).send({ error: true });
  }

  const isMatch = await bcrypt.compare(password, existingStudent[0].password);
  // si les mots de passe correspondent
  if (isMatch) {
    console.log("mot de passe correct");
    const accessToken = jwt.sign(rollNo, process.env.ACCESS_TOKEN_SECRET); //on crée un JWT
    console.log("access token", accessToken);
    return res.status(200).json({ accessToken: accessToken, error: false }); //on retourne un message de succès
    // sinon, on renvoit un message d'erreur
  } else {
    console.log("mot de passe incorrect");
    return res.status(200).send({ error: true });
  }
}
