'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import yachtsData from '@/data/yachts.json';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface FiltersState {
  priceMin: number;
  priceMax: number;
  yachtSize: string;
  yachtType: string;
  guests: string;
  location: string;
  yachtName: string;
}

interface ChartersGridProps {
  filters: FiltersState;
}

export default function ChartersGrid({ filters }: ChartersGridProps) {
  const locale = useLocale() as 'en' | 'pl';
  const params = useParams();
  const localeParam = params.locale as string;

  // Filter yachts based on filter criteria
  const filteredYachts = yachtsData.yachts.filter((yacht) => {
    const matchesPrice =
      yacht.pricing.weeklyFrom >= filters.priceMin &&
      yacht.pricing.weeklyFrom <= filters.priceMax;

    const matchesSize =
      !filters.yachtSize ||
      yacht.specifications.length.toString().includes(filters.yachtSize);

    const matchesType =
      !filters.yachtType ||
      (yacht as any).type?.toLowerCase().includes(filters.yachtType.toLowerCase());

    const matchesGuests =
      !filters.guests ||
      yacht.specifications.guests.toString().includes(filters.guests);

    const matchesName =
      !filters.yachtName ||
      yacht.name[locale].toLowerCase().includes(filters.yachtName.toLowerCase());

    return matchesPrice && matchesSize && matchesType && matchesGuests && matchesName;
  });

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
        {filteredYachts.map((yacht, index) => (
            <motion.div
              variants={item}
              className={`relative h-[600px] group overflow-hidden cursor-pointer ${
                index % 2 === 1 ? 'md:translate-y-0' : ''
              }`}
            >
            {/* Image */}
            <Image
              src={yacht.images[0]}
              alt={yacht.name[locale]}
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
                  {yacht.name[locale]}
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                  {yacht.specifications.length}{yacht.specifications.lengthUnit} • {yacht.specifications.guests} guests • {yacht.specifications.cabins} cabins • {yacht.specifications.builder}
                </p>
                <p className="text-[#FFB703] text-3xl md:text-4xl font-bold mb-6">
                  FROM €{yacht.pricing.weeklyFrom.toLocaleString()} / week
                </p>
                <motion.button
                  className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact for more details
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredYachts.length === 0 && (
        <div className="w-full py-24 text-center">
          <p className="text-gray-500 text-xl">No charters found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
