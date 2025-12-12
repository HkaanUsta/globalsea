'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import destinationsData from '@/data/destinations.json';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function DestinationPreview() {
  const t = useTranslations('home.destinations');
  const locale = useLocale() as 'en' | 'pl';
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const featuredDestinations = destinationsData.destinations.filter(dest => dest.featured).slice(0, 4);

  // Embla Carousel for fullscreen slides
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track slide changes
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

  // Parallax effects for background decorations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yCircle1 = useTransform(scrollYProgress, [0, 1], ['-100px', '100px']);
  const yCircle2 = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Fullscreen Carousel */}
      <div className="relative h-[600px] overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {featuredDestinations.map((dest, index) => (
            <div key={dest.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background Image */}
              <Image
                src={dest.image}
                alt={dest.name[locale]}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />

              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10" />

              {/* Parallax decorative elements */}
              <motion.div
                className="absolute top-20 left-20 w-96 h-96 bg-[#20B2AA]/10 rounded-full blur-3xl"
                style={{ y: yCircle1, scale }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFB703]/10 rounded-full blur-3xl"
                style={{ y: yCircle2, scale }}
              />

              {/* Content - Centered with Fade Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-8 md:px-16 flex justify-center">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={`content-${dest.id}`}
                        className="max-w-3xl text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      >
                        <motion.p
                          className="text-[#20B2AA] text-lg md:text-xl uppercase tracking-widest mb-4 font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          featured destination
                        </motion.p>
                        <motion.h2
                          className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {dest.name[locale]}
                        </motion.h2>
                        <motion.div
                          className="w-24 h-1 bg-[#20B2AA] mb-6"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <motion.p
                          className="text-white/90 text-xl md:text-2xl leading-relaxed mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          Discover the beauty and luxury of this magnificent destination. Experience unforgettable moments in paradise.
                        </motion.p>
                        <motion.button
                          className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          Explore {dest.name[locale]} →
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border-2 border-white/30 hover:scale-110"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl border-2 border-white/30 hover:scale-110"
        aria-label="Next destination"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {featuredDestinations.map((_, idx) => (
          <button
            key={idx}
            className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300"
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
