'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import destinationsData from '@/data/destinations.json';
import { useLocale } from 'next-intl';

export default function FeaturedDestinationCarousel() {
  const locale = useLocale() as 'en' | 'pl';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const featuredDestinations = destinationsData.destinations.filter(dest => dest.featured);

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

  if (featuredDestinations.length === 0) return null;

  const currentDestination = featuredDestinations[selectedIndex];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Carousel */}
      <div className="relative h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {featuredDestinations.map((destination, index) => (
            <div key={destination.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <Image
                src={destination.image}
                alt={destination.name[locale]}
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

      {/* Content - Bottom Left */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-8 md:px-16 pb-20 relative z-10">
          <AnimatePresence mode="wait">
            {currentDestination && (
              <motion.div
                key={`content-${currentDestination.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-[#20B2AA] text-sm uppercase tracking-widest mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  featured destination
                </motion.p>
                <motion.h2
                  className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {currentDestination.name[locale]}
                </motion.h2>
                <motion.p
                  className="text-gray-300 text-lg mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {currentDestination.description[locale]}
                </motion.p>
                <motion.button
                  className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border border-white/30 hover:scale-110 md:flex hidden"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border border-white/30 hover:scale-110 md:flex hidden"
        aria-label="Next destination"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
