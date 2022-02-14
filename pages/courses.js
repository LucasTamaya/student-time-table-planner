import CourseWidget from "../components/CourseWidget";
import Navbar from "../components/Navbar";
const axios = require("axios");

export default function Courses({ data }) {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-4xl text-center font-bold">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md lg:grid-cols-3">
          {data &&
            data.map((courses) => (
              <CourseWidget
                name={courses.name}
                id={courses._id}
                key={courses._id}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/courses");
  const data = await res.data;

  return {
    props: {
      data: data,
    },
  };
};
