import { Link } from 'react-router-dom';
import BackgroundImage from '../ui/BackgroundImage';
import { Button } from 'primereact/button';

function Homepage() {
  return (
    <>
      <BackgroundImage src="./bg.webp" alt="Background Image" />
      <div className="relative z-10 text-center mt-28">
        <h1 className="text-6xl text-accent tracking-tight font-normal mb-10">
          Welcome to NoteVault
        </h1>
        <Link to="/dashboard">
          <Button
            label="Explore Materials"
            className="px-8 py-4 bg-primary rounded-lg font-semibold text-lg text-text hover:bg-accent transition-all duration-300 shadow-lg"
          />
        </Link>
      </div>
    </>
  );
}

export default Homepage;
