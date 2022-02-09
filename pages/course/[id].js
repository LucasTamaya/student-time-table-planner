import Classes from "../../components/Classes";
import { connectToDatabase } from "../../util/mongodb";
const axios = require("axios");

const Course = ({ data }) => {
  return (
    <div>
      <Classes data={data} />
    </div>
  );
};

export default Course;

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();

  const courseCode = context.params.id;

  const res = await db
    .collection("classes")
    .find({ courseCode: courseCode })
    .toArray();

  const data = JSON.parse(JSON.stringify(res));

  if (data) {
    console.log(data);
  } else {
    console.log("error in fetch");
  }

  return {
    props: {
      data: data,
    },
  };
};
