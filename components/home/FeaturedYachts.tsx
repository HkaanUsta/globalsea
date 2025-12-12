'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import yachtsData from '@/data/yachts.json';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Anchor } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function FeaturedYachts() {
  const t = useTranslations('home.featuredYachts');
  const locale = useLocale() as 'en' | 'pl';
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const featuredYachts = yachtsData.yachts.filter(yacht => yacht.featured).slice(0, 1);

  // Embla Carousel for fullscreen slides
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

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
          {featuredYachts.map((yacht, index) => (
            <div key={yacht.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background Image */}
              <Image
                src={yacht.images[0]}
                alt={yacht.name[locale]}
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
                        key={`content-${yacht.id}`}
                        className="max-w-3xl text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <Anchor className="w-16 h-16 text-[#20B2AA] mb-6" />
                        </motion.div>
                        <motion.h2
                          className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {yacht.name[locale]}
                        </motion.h2>
                        <motion.div
                          className="w-24 h-1 bg-[#20B2AA] mb-6"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <motion.div
                          className="text-white/90 text-xl md:text-3xl leading-relaxed mb-8 space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <p className="text-3xl font-semibold text-[#FFB703]">€{yacht.pricing.weeklyFrom.toLocaleString()} / week</p>
                          <p>{yacht.specifications.length}{yacht.specifications.lengthUnit} • {yacht.specifications.guests} guests • {yacht.specifications.cabins} cabins</p>
                          <p className="text-sm opacity-80">Built by {yacht.specifications.builder} in {yacht.specifications.yearBuilt}</p>
                        </motion.div>
                        <motion.button
                          className="bg-[#20B2AA] hover:bg-[#20B2AA]/90 text-white px-8 py-3 rounded-full text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          View {yacht.name[locale]} →
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
    </div>
  );
}
