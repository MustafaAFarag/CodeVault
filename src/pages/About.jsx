/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Row */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl text-primary">Welcome to NoteVault</h1>
          <p className="leading-relaxed text-md">
            NoteVault is a community-driven platform designed to help students
            excel in their studies by providing easy access to high-quality
            notes and lecture materials. Our mission is to create a
            collaborative space where knowledge is shared and learning is
            enhanced.
          </p>
          <p>
            Whether you're a student looking to catch up on missed lectures or
            someone who wants to consolidate your understanding before exams,
            NoteVault provides a vast repository of resources at your
            fingertips.
          </p>
          <p>
            Our platform also encourages students to contribute their own notes,
            fostering a culture of collaboration and mutual support. With a
            user-friendly interface and seamless access to study materials,
            NoteVault aims to revolutionize the way students prepare for their
            academic challenges.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="./about-1.webp"
            loading="lazy"
            alt="Collaborative Learning"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Second Row */}
        <div className="order-last md:order-none flex items-center justify-start">
          <img
            src="./about-2.webp"
            alt="Organized Notes"
            loading="lazy"
            width="450"
            height="450"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col items-start gap-8">
          <h1 className="text-4xl text-primary">Why NoteVault</h1>
          <p className="leading-relaxed text-md">
            At NoteVault, we understand the importance of having well-organized
            and easily accessible study materials. Our platform allows you to
            find notes tailored to your specific courses, helping you focus on
            what matters most.
          </p>
          <p>
            Join our growing community of learners, contribute your knowledge,
            and benefit from the collective wisdom of others. Together, we can
            achieve academic excellence and make studying a more enjoyable and
            effective experience.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 bg-primary rounded-lg font-semibold text-lg text-background hover:bg-accent transition-all duration-300 shadow-lg"
          >
            Explore Materials
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
