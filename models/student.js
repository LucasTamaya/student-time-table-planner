import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  // go ahead and fill them
});

const model = mongoose.model("StudentModel", StudentSchema);

export default model;
