export default function Register() {
  function handleForm(event) {
    event.preventDefault();
  }
  return (
    <>
      <div>
        <form>
          <input
            className="px-3 py-1 m-2 border border-black"
            type="text"
            name="rollNumber"
            placeholder="Your Roll Number"
          />
          <input
            className="px-3 py-1 m-2 border border-black"
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className="px-3 py-1 m-2 border border-black"
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            className="bg-blue-500 px-3 py-1 rounded-sm text-white font-semibold"
            type="submit"
            onClick={handleForm}
            value="Register"
          />
        </form>
      </div>
    </>
  );
}
