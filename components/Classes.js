import { useState } from "react";

const Classes = ({data}) => {

    const [classId, setClassId] = useState("")

    return ( 
        <>
            {data && data.map((classe) => (
                <div className="border border-black rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5">
                    <h1>{classe.faculty} Class</h1>
                    <p>{classe.day}</p>
                    <p>From {classe.from} to {classe.to} </p>
                    <button className="border border-black p-2 rounded-xl" onClick={() => setClassId(classe._id)}>Add this class</button>
                </div>
            ))}

            {classId && <p>{classId}</p>}
        </>
     );
}
 
export default Classes;