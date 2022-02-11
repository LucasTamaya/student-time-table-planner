import { connectToDatabase } from "../../../util/mongodb";
import NextCors from "nextjs-cors";
const jwt = require("jsonwebtoken");


export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  const accessToken = req.query.id;

  const authenticatedStudent = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(authenticatedStudent){
        // const projection = {projection: {_id: 0, rollNo: 0, name: 0, classes: 1, password: 0}} afin de juste recuperer le tableau classes

        const data = await db.collection("students").find({rollNo: authenticatedStudent}).toArray();

        const selectedClasses = data[0].classes;

        if(selectedClasses){
            console.log("Voila les classes selectionner", selectedClasses)
            return res.status(200).json(selectedClasses)
        } else {
            return res.status(200).send({error: true})
        }
    } else {
        console.log("JWT error signature")
        return res.status(500)
    }

}