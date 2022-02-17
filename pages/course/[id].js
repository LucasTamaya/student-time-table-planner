import Classes from "../../components/Classes";
import { useState, useEffect } from "react";

const Course = ({ id }) => {
  const [classes, setClasses] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const fetching = async () => {
    const res = await fetch(
      `http://localhost:3000/api/classes/${id}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      }
    );

    const data = await res.json();

    // si erreur avec JWT
    if (data.message === "JWT error") {
      setErrorMessage("Error, you must be connected");
    }

    // si erreur pendant le fetch
    if (data.message === "Fetch error") {
      setErrorMessage("Internal server error during the fetch of the data");
    }

    // si aucune erreur
    if (!data.message) {
      setClasses(data);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <div>
      <Classes classes={classes} classesErrorMessage={errorMessage}/>
    </div>
  );
};

export default Course;

export async function getServerSideProps(context) {

  const id = context.params.id

  return {
    props: {
      id: id
    }, // will be passed to the page component as props
  }
}