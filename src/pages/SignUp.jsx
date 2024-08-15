import { Link } from 'react-router-dom';
import SignupForm from '../features/authentication/SignupForm';
import Logo from '../ui/Logo';

function SignUp() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-md p-8 max-w-lg w-full">
        <Logo className="mb-6" />
        <h4 className="text-center text-2xl text-white mb-6">Sign up</h4>
        <SignupForm />

        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 text-sm mt-4"
        >
          Already have an Account?
          <span className="font-semibold"> Log in!</span>
        </Link>
      </div>
    </main>
  );
}

export default SignUp;
