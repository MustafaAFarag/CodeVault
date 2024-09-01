import { motion } from 'framer-motion';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';

function Account() {
  return (
    <div className="bg-gray-50 p-4">
      <motion.h1
        className="mb-6 mt-10 text-center text-3xl font-bold text-teal-600 sm:text-4xl md:text-5xl lg:mb-12 lg:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Account Settings
      </motion.h1>

      <motion.div
        className="flex flex-col lg:flex-row lg:space-x-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side - Update User Data */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-md md:p-6 lg:mb-0 lg:w-1/2">
          <UpdateUserDataForm />
        </div>

        {/* Right Side - Update Password */}
        <div className="rounded-lg bg-white p-4 shadow-md md:p-6 lg:w-1/2">
          <UpdatePasswordForm />
        </div>
      </motion.div>
    </div>
  );
}

export default Account;
