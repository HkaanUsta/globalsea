'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/shared/Button';

export default function CallToAction() {
  const t = useTranslations('home.cta');
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], ['80px', '-80px']);
  const yRight = useTransform(scrollYProgress, [0, 1], ['-80px', '80px']);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-32 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#20B2AA] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFB703] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Image - Smaller, Higher Position */}
          <motion.div
            className="relative lg:translate-y-[-40px] order-2 lg:order-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: yLeft }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80"
                alt="Luxury yacht"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div
            className="text-center order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">{t('title')}</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
            <Button size="lg" variant="secondary" className="shadow-2xl hover:shadow-3xl px-10 py-5 text-lg">
              {t('button')}
            </Button>
          </motion.div>

          {/* Right Image - Smaller, Lower Position */}
          <motion.div
            className="relative lg:translate-y-[40px] order-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: yRight }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1566024287286-457247b70310?w=600&q=80"
                alt="Yacht sailing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
