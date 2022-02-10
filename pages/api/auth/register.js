import { connectToDatabase } from "../../../util/mongodb"; //connexion à mongoDB optimisé
import NextCors from "nextjs-cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // // middle type CORS
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // récupère les données du client
  const { rollNo, name, classes, password } = req.body;

  // vérification si étudiant deja existant
  const existingStudent = await db
    .collection("students")
    .find({ rollNo: rollNo })
    .toArray();

  console.log(existingStudent);

  // si étudiant deja existant, renvoit message erreur
  if (existingStudent.length >= 1) {
    console.log("utilisateur déjà existant");
    return res.status(200).send({ error: "existing student" });
    // sinon, enregistre l'etudiant avec le hash password
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newStudent = await db.collection("students").insertOne({
      rollNo: rollNo,
      name: name,
      classes: classes,
      password: hashPassword,
    });
    // création du JWT (Json Web Token)
    const accessToken = jwt.sign(rollNo, process.env.ACCESS_TOKEN_SECRET);
    console.log("access token", accessToken);

    res.status(200).send({ error: false, accessToken: accessToken });
  }
}
