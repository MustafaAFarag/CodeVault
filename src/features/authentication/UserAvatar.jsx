import { useUser } from './useUser';
import { motion } from 'framer-motion'; // Import motion from framer-motion

function UserAvatar() {
  const { user } = useUser();
  const { full_name, avatar } = user;

  return (
    <motion.div
      className="flex items-center gap-3 font-semibold"
      // Framer Motion props
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 1 }} // Revert to original scale on tap/click
      transition={{ duration: 0.2 }} // Duration for the hover animation
    >
      <motion.img
        className="aspect-square h-12 w-12 rounded-full object-cover object-center outline-2 outline-teal-500 sm:block"
        src={avatar || 'default-user.jpg'}
        alt={`Avatar of ${full_name}`}
        whileHover={{ scale: 1.05 }} // Add hover effect to the image
        transition={{ duration: 0.2 }}
      />
      <span className="text-sm text-text lg:text-xl">{full_name}</span>
    </motion.div>
  );
}

export default UserAvatar;
