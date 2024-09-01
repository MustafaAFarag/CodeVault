import { motion } from 'framer-motion';
import BackgroundImage from '../ui/BackgroundImage';
import LinkButton from '../ui/LinkButton';

function Homepage() {
  return (
    <>
      <BackgroundImage src="./file.jpg" alt="Background Image" />
      <div className="relative z-10 mt-[12rem] px-4 text-center md:mr-[5rem] md:mt-[22rem]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-accent md:mb-10 md:text-6xl lg:text-7xl"
        >
          Welcome to EduData
        </motion.h1>
        <LinkButton to="/dashboard" label="Get Started" />
      </div>
    </>
  );
}

export default Homepage;
