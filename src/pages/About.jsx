import { animate } from 'motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

function About() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    // Fade-in animation for title and text
    animate(
      titleRef.current,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 0.6, delay: 0.2 },
    );

    animate(
      textRef.current,
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 0.6, delay: 0.4 },
    );

    // Scale-in animation for images
    animate(
      img1Ref.current,
      { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
      { duration: 0.8, delay: 0.4 },
    );

    animate(
      img2Ref.current,
      { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
      { duration: 0.8, delay: 0.6 },
    );

    // Scroll-triggered animations
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-text md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {/* First Row */}
        <div className="flex flex-col gap-10" ref={titleRef}>
          <h1 className="text-5xl font-bold text-primary md:text-5xl">
            Welcome to EduData
          </h1>
          <p className="text-lg leading-relaxed md:text-2xl" ref={textRef}>
            Edudata is a community-driven platform designed to help students
            excel in their studies by providing easy access to high-quality
            notes and lecture materials. Our mission is to create a
            collaborative space where knowledge is shared and learning is
            enhanced.
          </p>
          <p className="text-lg md:text-2xl">
            Whether you&apos;re a student looking to catch up on missed lectures
            or someone who wants to consolidate your understanding before exams,
            Edudata provides a vast repository of resources at your fingertips.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, at!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
            tempore.
          </p>
        </div>
        <div className="flex items-center justify-center" ref={img1Ref}>
          <img
            src="./about-3.jpg"
            loading="lazy"
            alt="Collaborative Learning"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Second Row */}
        <div
          className="order-last flex items-center justify-center md:order-none md:justify-start"
          ref={img2Ref}
        >
          <img
            src="./about-4.jpg"
            alt="Organized Notes"
            loading="lazy"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col items-start gap-10">
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
        </div>
      </div>
    </div>
  );
}

export default About;
