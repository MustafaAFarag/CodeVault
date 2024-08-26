import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SignupForm from '../features/authentication/SignupForm';
import Logo from '../ui/Logo';

function SignUp() {
  return (
    <main className="bg-white text-gray-800 flex justify-center items-center p-4">
      <motion.div
        className="flex border border-gray-300 rounded-lg shadow-lg max-w-8xl p-4 h-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side: Signup Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 rounded-r-lg p-10">
          <div className="flex flex-col gap-3">
            <Logo width={120} height={120} />
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">
              Join Us!
            </h4>
            <SignupForm />
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 text-lg text-center"
            >
              Already have an account?
              <span className="font-semibold text-blue-700"> Log in!</span>
            </Link>
          </div>
        </div>
        {/* Right side: Image or Picture */}
        <div className="w-1/2 hidden lg:block">
          <img
            src="./sign-up.jpg"
            alt="Signup Illustration"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
      </motion.div>
    </main>
  );
}

export default SignUp;
