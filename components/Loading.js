import AutorenewIcon from "@mui/icons-material/Autorenew";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <h2 className="text-center text-4xl font-bold">Loading</h2>
      <AutorenewIcon className="animate-spin text-4xl" />
    </div>
  );
};

export default Loading;
