import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="flex h-screen items-center justify-center bg-white p-4 text-gray-800 2xl:items-start">
      <motion.div
        className="max-w-8xl flex h-auto rounded-lg border border-gray-300 p-4 shadow-lg 2xl:mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left side: Image or Picture */}
        <div className="hidden w-1/2 lg:block">
          <img
            src="./login.jpg"
            alt="Login Illustration"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>

        {/* Right side: Login Form */}
        <div className="w-full rounded-r-lg bg-gray-50 p-10 lg:w-1/2">
          <div className="flex flex-col gap-3">
            <Logo width={120} height={120} />
            <h4 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Welcome Back!
            </h4>
            <LoginForm />
            <Link
              to="/signup"
              className="text-center text-lg text-blue-500 hover:text-blue-400"
            >
              Don&apos;t have an account?
              <span className="font-semibold text-blue-700"> Sign up!</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default Login;
