'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EventsHero() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=80"
          alt="Events background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content - Centered */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center px-8 md:px-16 z-10 pt-48 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <motion.p
            className="text-[#20B2AA] text-lg md:text-xl uppercase tracking-widest mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            boat shows & events
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-6 drop-shadow-2xl break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Global Maritime Events
          </motion.h1>
          <motion.p
            className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover where Global Sea showcases the finest yachts and connects with industry leaders at the world's most prestigious maritime events
          </motion.p>
          <motion.button
            className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
