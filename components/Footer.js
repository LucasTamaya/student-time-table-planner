import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-blue-500 w-screen h-20 absolute bottom-0 flex justify-center items-center gap-x-10">
      <a
        href="https://github.com/LucasTamaya/student-time-table-planner"
        target="_blank"
      >
        <GitHubIcon className="text-4xl text-white transition ease-out hover:scale-110" />
      </a>
      <a href="https://www.linkedin.com/in/lucas-tamaya-41a09621b/">
        <LinkedInIcon className="text-4xl text-white transition ease-out hover:scale-110" />
      </a>
    </footer>
  );
};

export default Footer;
