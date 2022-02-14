import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-5 mb-10 flex justify-between">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/courses">All Courses</Link>
      <Link href="/my-classes">My Classes</Link>
      <Link href="/timetable">Timetable</Link>
    </nav>
  );
};

export default Navbar;
