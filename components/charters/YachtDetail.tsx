'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Anchor, Users, Waves, Gauge } from 'lucide-react';

interface Yacht {
  id: string;
  slug: string;
  name: {
    en: string;
    pl: string;
  };
  images: string[];
  description: {
    en: string;
    pl: string;
  };
  specifications: {
    length: number;
    lengthUnit: string;
    cabins: number;
    guests: number;
    crew: number;
    yearBuilt: number;
    builder: string;
    cruisingSpeed: number;
    maxSpeed: number;
    beam: number;
    draft: number;
  };
  amenities: string[];
  pricing: {
    weeklyFrom: number;
    currency: string;
    salePriceFrom?: number;
  };
  forSale: boolean;
  forCharter: boolean;
}

interface YachtDetailProps {
  yacht: Yacht;
}

const amenityIcons: { [key: string]: string } = {
  'jacuzzi': '🛁',
  'jetski': '🚤',
  'wifi': '📡',
  'airConditioning': '❄️',
  'waterToys': '🏄',
  'gym': '💪',
  'beach-club': '🏖️',
  'stabilizers': '⚙️',
  'tender': '⛵',
  'snorkeling': '🤿'
};

export default function YachtDetail({ yacht }: YachtDetailProps) {
  const locale = useLocale() as 'en' | 'pl';

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[500px] md:h-[600px]"
      >
        <Image
          src={yacht.images[0]}
          alt={yacht.name[locale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {yacht.name[locale]}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl">
              {yacht.description[locale]}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-24">
        {/* Specifications Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          <div className="bg-gradient-to-br from-[#20B2AA]/5 to-white rounded-lg p-6 shadow-lg border border-[#20B2AA]/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-widest text-gray-600 font-semibold">Length</h3>
              <Waves className="w-5 h-5 text-[#20B2AA]" />
            </div>
            <p className="text-2xl font-bold text-[#444444]">{yacht.specifications.length}m</p>
          </div>

          <div className="bg-gradient-to-br from-[#20B2AA]/5 to-white rounded-lg p-6 shadow-lg border border-[#20B2AA]/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-widest text-gray-600 font-semibold">Cabins</h3>
              <Anchor className="w-5 h-5 text-[#20B2AA]" />
            </div>
            <p className="text-2xl font-bold text-[#444444]">{yacht.specifications.cabins}</p>
          </div>

          <div className="bg-gradient-to-br from-[#20B2AA]/5 to-white rounded-lg p-6 shadow-lg border border-[#20B2AA]/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-widest text-gray-600 font-semibold">Guests</h3>
              <Users className="w-5 h-5 text-[#20B2AA]" />
            </div>
            <p className="text-2xl font-bold text-[#444444]">{yacht.specifications.guests}</p>
          </div>

          <div className="bg-gradient-to-br from-[#20B2AA]/5 to-white rounded-lg p-6 shadow-lg border border-[#20B2AA]/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-widest text-gray-600 font-semibold">Speed</h3>
              <Gauge className="w-5 h-5 text-[#20B2AA]" />
            </div>
            <p className="text-2xl font-bold text-[#444444]">{yacht.specifications.maxSpeed} kn</p>
          </div>
        </motion.div>

        {/* Main Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-start mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-[#444444] mb-6">Yacht Details</h2>
              <div className="w-24 h-1 bg-[#20B2AA] rounded-full" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-widest text-[#20B2AA] font-semibold mb-2">Builder</p>
                <p className="text-xl text-[#444444] font-medium">{yacht.specifications.builder}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-[#20B2AA] font-semibold mb-2">Year Built</p>
                <p className="text-xl text-[#444444] font-medium">{yacht.specifications.yearBuilt}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-[#20B2AA] font-semibold mb-2">Crew</p>
                <p className="text-xl text-[#444444] font-medium">{yacht.specifications.crew} crew members</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-[#20B2AA] font-semibold mb-2">Dimensions</p>
                <p className="text-xl text-[#444444] font-medium">
                  Beam: {yacht.specifications.beam}m | Draft: {yacht.specifications.draft}m
                </p>
              </div>

              {yacht.forCharter && (
                <div className="pt-6">
                  <p className="text-sm uppercase tracking-widest text-[#20B2AA] font-semibold mb-3">Charter Rate</p>
                  <p className="text-3xl font-bold text-[#FFB703]">
                    €{yacht.pricing.weeklyFrom.toLocaleString()} / week
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={yacht.images[1] || yacht.images[0]}
              alt={yacht.name[locale]}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Amenities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#444444] mb-6">Amenities & Features</h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {yacht.amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#20B2AA]/5 to-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#20B2AA]/20 hover:border-[#20B2AA]/50"
              >
                <div className="text-3xl mb-3">{amenityIcons[amenity] || '✨'}</div>
                <p className="text-[#444444] font-semibold text-sm capitalize">
                  {amenity.replace(/([A-Z])/g, ' $1').replace('-', ' ')}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#444444] mb-6">Gallery</h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yacht.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${yacht.name[locale]} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 bg-gradient-to-r from-[#20B2AA]/5 to-transparent rounded-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#444444] mb-6">
            Interested in {yacht.name[locale]}?
          </h2>
          <p className="text-gray-700 text-xl mb-8 max-w-2xl mx-auto">
            Contact our team to learn more about chartering or purchasing this magnificent vessel.
          </p>
          <button className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Contact Us →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
