import SignupForm from '../features/authentication/SignupForm';
import Logo from '../ui/Logo';

function SignUp() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-md p-8 max-w-lg w-full">
        <Logo className="mb-6" />
        <h4 className="text-center text-2xl text-white mb-6">Sign up</h4>
        <SignupForm />
      </div>
    </main>
  );
}

export default SignUp;
