import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import BackgroundImage from '../ui/BackgroundImage';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function Homepage() {
  const headlineRef = useRef(null);

  useEffect(() => {
    animate(
      headlineRef.current,
      { transform: ['translateY(50px)', 'translateY(0)'], opacity: [0, 1] },
      { duration: 1 },
    );
  }, []);

  return (
    <>
      <BackgroundImage src="./file.jpg" alt="Background Image" />
      <div className="relative z-10 text-center mt-[22rem] px-4 mr-[5rem]">
        <h1
          ref={headlineRef}
          className="text-7xl text-accent tracking-tight font-bold mb-10"
        >
          Welcome to EduData
        </h1>
        <Link to="/dashboard">
          <Button
            label="Get Started"
            className="px-8 py-4 bg-secondary rounded-full font-semibold text-3xl text-text hover:bg-accent transition-all duration-300 shadow-lg"
          />
        </Link>
      </div>
    </>
  );
}

export default Homepage;
