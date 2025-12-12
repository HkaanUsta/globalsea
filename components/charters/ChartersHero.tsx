'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface FiltersState {
  priceMin: number;
  priceMax: number;
  yachtSize: string;
  yachtType: string;
  guests: string;
  location: string;
  yachtName: string;
}

interface ChartersHeroProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
}

export default function ChartersHero({ filters, setFilters }: ChartersHeroProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: number) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setFilters(localFilters);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden pt-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="Charter background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-12 drop-shadow-2xl leading-tight">
            Find your<br />charter
          </h1>



          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-sm mt-8"
          >
            Discover luxury yacht charters tailored to your dreams
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
