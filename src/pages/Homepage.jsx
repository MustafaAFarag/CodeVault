import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <>
      <img
        alt="Background Image"
        loading="lazy"
        decoding="async"
        className="absolute h-full w-full inset-0 text-transparent object-top object-cover"
        src="./bg.webp"
      />
      <div className="relative z-10 text-center mt-28">
        <h1 className="text-6xl text-accent tracking-tight font-normal mb-10">
          Welcome to NoteVault
        </h1>
        <Link
          to="/dashboard"
          className="px-8 py-4 bg-primary rounded-lg font-semibold text-lg text-background hover:bg-accent transition-all duration-300 shadow-lg"
        >
          Explore Materials
        </Link>
      </div>
    </>
  );
}

export default Homepage;
