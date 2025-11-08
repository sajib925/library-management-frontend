import { motion } from "framer-motion";

export default function BorrowSummaryHero() {
  return (
    <section className="w-full h-[60vh] relative bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center">
      <div className="text-center text-white px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl"
        >
          Your Borrowing Summary
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl mb-6 opacity-90"
        >
          Check your current borrowings, due dates, and return history in one place.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#summary"
          className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          View Summary
        </motion.a>
      </div>
    </section>
  );
}
