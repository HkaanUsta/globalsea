'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import destinationsData from '@/data/destinations.json';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface FiltersState {
  priceMin: number;
  priceMax: number;
}

interface DestinationsGridProps {
  filters: FiltersState;
}

export default function DestinationsGrid({ filters }: DestinationsGridProps) {
  const locale = useLocale() as 'en' | 'pl';
  const params = useLocale() as 'en' | 'pl';

  // Filter destinations
  const filteredDestinations = destinationsData.destinations;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-white">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-0"
      >
        {filteredDestinations.map((destination, index) => (
          <Link key={destination.id} href={`/${locale}/destinations/${destination.slug}`}>
            <motion.div
              variants={item}
              className={`relative h-[600px] group overflow-hidden cursor-pointer ${
                index % 2 === 1 ? 'md:translate-y-0' : ''
              }`}
            >
              {/* Image */}
              <Image
                src={destination.image}
                alt={destination.name[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content - Centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                <motion.div
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-md"
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {destination.name[locale]}
                  </h3>
                  <div className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                    <ReactMarkdown>
                      {destination.description[locale].length > 150
                        ? `${destination.description[locale].substring(0, 150)}...`
                        : destination.description[locale]}
                    </ReactMarkdown>
                  </div>
                  <motion.button
                    className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore →
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredDestinations.length === 0 && (
        <div className="w-full py-24 text-center">
          <p className="text-gray-500 text-xl">No destinations found.</p>
        </div>
      )}
    </div>
  );
}
