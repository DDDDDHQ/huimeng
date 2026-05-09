import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-24 right-6 z-40"
    >
      <Link to="/record">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/30 flex items-center justify-center"
        >
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </motion.button>
      </Link>
    </motion.div>
  );
};
