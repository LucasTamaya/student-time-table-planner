import { useEffect, useState } from "react";

const Classes = ({data}) => {

    const [obj, setObj] = useState([])

    useEffect(() => {
        console.log(obj)
        console.log(typeof obj)
    }, [obj])

    return ( 
        <>
            {data && data.map((classe) => (
                <div className="border border-black rounded-md w-72 h-72 mx-auto my-10 p-4 flex flex-col items-center justify-center gap-y-5">
                    <h1>{classe.faculty} Class</h1>
                    <p>{classe.day}</p>
                    <p>From {classe.from} to {classe.to} </p>
                    <button className="border border-black p-2 rounded-xl" onClick={() => setObj([...obj, classe])}>Add this class</button>
                </div>
            ))}

            {obj && obj.map((x) => (
                <div key={x._id}>
                    <p>{x._day}</p>
                    <p>{x._from}</p>
                    <p>{x._to}</p>
                </div>
            ))}
        </>
     );
}
 
export default Classes;