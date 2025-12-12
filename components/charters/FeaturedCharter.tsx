'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import yachtsData from '@/data/yachts.json';
import { useLocale } from 'next-intl';

export default function FeaturedCharter() {
  const locale = useLocale() as 'en' | 'pl';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const featuredYachts = yachtsData.yachts.filter(yacht => yacht.featured);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (featuredYachts.length === 0) return null;

  const currentYacht = featuredYachts[selectedIndex];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Carousel */}
      <div className="relative h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {featuredYachts.map((yacht, index) => (
            <div key={yacht.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <Image
                src={yacht.images[0]}
                alt={yacht.name[locale]}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 z-10">
        <AnimatePresence mode="wait">
          {currentYacht && (
            <motion.div
              key={`content-${currentYacht.id}`}
              className="text-center max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-[#20B2AA] text-lg md:text-xl uppercase tracking-widest mb-4 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  featured charter
                </motion.p>
                <motion.h2
                  className="text-7xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {currentYacht.name[locale]}
                </motion.h2>
                <motion.p
                  className="text-gray-300 text-xl md:text-2xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {currentYacht.specifications.length}{currentYacht.specifications.lengthUnit} • {currentYacht.specifications.guests} guests • {currentYacht.specifications.cabins} cabins • €{currentYacht.pricing.weeklyFrom.toLocaleString()} / week
                </motion.p>
                <motion.button
                  className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details →
                </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border border-white/30 hover:scale-110 md:flex hidden"
        aria-label="Previous charter"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border border-white/30 hover:scale-110 md:flex hidden"
        aria-label="Next charter"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
