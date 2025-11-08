import { motion } from "framer-motion";

export default function AllBooksHero() {
  return (
    <section className="w-full h-[60vh] relative bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="text-center text-white px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl"
        >
          Explore Our Entire Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl mb-6 opacity-90"
        >
          Browse thousands of books across all genres and authors. Find your next favorite read.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#books"
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Browse Books
        </motion.a>
      </div>
    </section>
  );
}
