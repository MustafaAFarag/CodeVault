import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import BackgroundImage from '../ui/BackgroundImage';
import LinkButton from '../ui/LinkButton';

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
      <div className="relative z-10 mt-[12rem] px-4 text-center md:mr-[5rem] md:mt-[22rem]">
        <h1
          ref={headlineRef}
          className="mb-6 text-4xl font-bold tracking-tight text-accent md:mb-10 md:text-6xl lg:text-7xl"
        >
          Welcome to EduData
        </h1>
        <LinkButton to="/dashboard" label="Get Started" />
      </div>
    </>
  );
}

export default Homepage;
