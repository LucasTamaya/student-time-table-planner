import Link from "next/link";

const CourseWidget = ({ name, id }) => {
  return (
    <>
      <Link href={`../course/${id}`}>
        <div className="w-80 h-80 bg-blue-400 rounded-md cursor-pointer mx-auto my-10 p-4 flex items-center justify-center hover:bg-blue-500">
          <h1 className="text-white text-xl text-center">{name}</h1>
        </div>
      </Link>
    </>
  );
};

export default CourseWidget;
