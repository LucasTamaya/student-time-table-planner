import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";
const jwt = require("jsonwebtoken");


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

//   console.log(req);

  //   si méthode GET
  if (req.method === "GET") {
    console.log("test");
    const courseCode = req.query.id;
    // console.log(courseCode);

    const classes = await db
      .collection("classes")
      .find({ courseCode: courseCode })
      .toArray();

    if (classes) {
    //   console.log(classes);
      res.status(200).json(classes);
    } else {
      console.log("error in fetch");
      res.status(500);
    }
    // sinon, si méthode POST
  } else {
    console.log(req.body)
    //   récupération accessToken
    const accessToken = req.query.id;

    // récupération id de la classe
    const { currentClasses } = req.body;

    const authenticatedStudent = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(authenticatedStudent){
        console.log("rollNo:", authenticatedStudent)

        const filter = {rollNo: authenticatedStudent}

        const newClass = {$set: {classes: currentClasses}}

        const updateClass = await db.collection("students").updateOne(filter, newClass)
        if(updateClass){
            console.log("class update avec succes")
            res.status(200).send({error: false})
        } else {
            res.status(200).send({error: true})
        }
    } else {
        console.log("JWT error signature")
    }


    // console.log(classId);
  }
}
