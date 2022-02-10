import Classes from "../../components/Classes";
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
  const res = await axios.get(
    `http://localhost:3000/api/classes/${context.params.id}`
  );

  console.log(res.data)

  const data = await res.data;

  return {
    props: {
      data: data,
    },
  };
};
