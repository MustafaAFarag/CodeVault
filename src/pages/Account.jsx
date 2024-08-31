// Account.js
import { motion } from 'framer-motion';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';

function Account() {
  return (
    <div className="bg-gray-50 p-4 lg:h-auto lg:p-8">
      <motion.h1
        className="mb-6 mt-10 text-center text-4xl font-bold text-teal-600 sm:text-5xl md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Account Settings
      </motion.h1>

      <motion.div
        className="mb-8 rounded-lg bg-white p-6 shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UpdateUserDataForm />
      </motion.div>

      <motion.div
        className="rounded-lg bg-white p-6 shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UpdatePasswordForm />
      </motion.div>
    </div>
  );
}

export default Account;
