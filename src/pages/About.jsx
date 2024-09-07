import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { motion } from 'framer-motion';

function About() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-text md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {/* First Row */}
        <motion.div
          className="flex flex-col gap-10"
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-primary md:text-5xl">
            Welcome to EduData
          </h1>
          <motion.p
            className="text-lg leading-relaxed md:text-2xl"
            ref={textRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Edudata is a community-driven platform designed to help students
            excel in their studies by providing easy access to high-quality
            notes and lecture materials. Our mission is to create a
            collaborative space where knowledge is shared and learning is
            enhanced.
          </motion.p>
          <p className="text-lg md:text-2xl">
            Whether you&apos;re a student looking to catch up on missed lectures
            or someone who wants to consolidate your understanding before exams,
            Edudata provides a vast repository of resources at your fingertips.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, at!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            tempore.
          </p>
        </motion.div>

        {/* First Image */}
        <motion.div
          className="flex items-center justify-center"
          ref={img1Ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src="./placeholder.jpg"
            data-src="./about1.jpg"
            alt="Collaborative Learning"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
            loading="lazy"
            onLoad={(e) => {
              e.target.src = e.target.dataset.src;
            }}
          />
        </motion.div>

        {/* Second Row */}
        <motion.div
          className="order-last flex items-center justify-center md:order-none md:justify-start"
          ref={img2Ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <img
            src="./placeholder.jpg"
            data-src="./about2.jpg"
            alt="Organized Notes"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
            loading="lazy"
            onLoad={(e) => {
              e.target.src = e.target.dataset.src; // Swap to main image
            }}
          />
        </motion.div>

        {/* Second Column Text */}
        <motion.div
          className="flex flex-col items-start gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-primary md:text-5xl">
            Why EduData
          </h1>
          <p className="text-lg leading-relaxed md:text-2xl">
            At Edudata, we understand the importance of having well-organized
            and easily accessible study materials. Our platform allows you to
            find notes tailored to your specific courses, helping you focus on
            what matters most.
          </p>
          <p className="text-lg md:text-2xl">
            Join our growing community of learners, contribute your knowledge,
            and benefit from the collective wisdom of others. Together, we can
            achieve academic excellence and make studying a more enjoyable and
            effective experience.
          </p>
          <Link to="/dashboard">
            <Button
              label="Explore Materials"
              className="rounded-full bg-secondary px-6 py-3 text-lg font-semibold text-text shadow-lg transition-all duration-300 hover:bg-accent md:px-8 md:py-4 md:text-3xl"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
