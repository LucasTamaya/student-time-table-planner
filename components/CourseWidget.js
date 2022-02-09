import Link from "next/link";

const CourseWidget = ({ name, id }) => {
  return (
    <>
      <Link href={`../course/${id}`}>
        <div className="border border-black rounded-md cursor-pointer w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center">
          <h1>{name}</h1>
        </div>
      </Link>
    </>
  );
};

export default CourseWidget;
