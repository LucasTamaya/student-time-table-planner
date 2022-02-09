import CourseWidget from "../components/CourseWidget";
const axios = require("axios");


export default function Courses({data}) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Courses</h1>
        <p>TO DO : show all the list of available courses here </p>
        {data && data.map((courses) => (
          <CourseWidget name={courses.name} id={courses._id} key={courses._id}/>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  
  const res = await axios.get("http://localhost:3000/api/courses");
  const data = await res.data


  return {
    props: {
      data: data,
    },
  };
};
