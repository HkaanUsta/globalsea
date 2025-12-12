'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DestinationsHero() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/destinations/mediterranean-1.jpg"
          alt="Destinations background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <motion.p
            className="text-gray-300 text-lg md:text-xl uppercase tracking-widest mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            our destinations
          </motion.p>
          <motion.h1
            className="text-7xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore The World
          </motion.h1>
          <motion.p
            className="text-gray-300 text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover breathtaking destinations and unforgettable maritime experiences
          </motion.p>
          <motion.button
            className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Destinations →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
