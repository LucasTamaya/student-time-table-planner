import CloseIcon from "@mui/icons-material/Close";

const PopUp = ({ popUp, setPopUp }) => {
  return (
    <div
      className={`${
        !popUp
          ? "opacity-0 pointer-events-none"
          : "opacity-1 pointer-events-auto"
      } fixed left-0 top-0 w-screen h-screen bg-blue-200/[0.8] flex justify-center items-center`}
    >
      <div className="w-96 h-64 bg-red-600 p-5 flex justify-center items-center relative">
        <h1 className="text-white text-xl">
          This class has already been selected
        </h1>
        <CloseIcon className="transition ease-out absolute top-5 right-5 text-white cursor-pointer hover:scale-110" onClick={() => setPopUp(!popUp)}/>
      </div>
    </div>
  );
};

export default PopUp;

/*
.popUpContainer {
  opacity: 0;
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.651);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popUp {
  width: 350px;
  height: 220px;
  background-color: var(--neutral-white);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}
*/
