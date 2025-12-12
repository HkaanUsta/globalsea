'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutUs() {
  const tAbout = useTranslations('home.about');
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

  return (
    <div ref={containerRef} className="w-full">
      {/* Header Section */}
      <div className="relative w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-32 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#20B2AA] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#444444] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-6xl md:text-8xl font-bold mb-6 text-[#444444]">
                {tAbout('title')}
              </h2>
              <div className="w-24 h-1 bg-[#20B2AA] rounded-full mb-12" />
            </div>
            <p className="text-gray-700 text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed">
              {tAbout('description1')}
            </p>
          </motion.div>
        </div>
      </div>


{/*

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ y: yImage }}
        className="relative w-full h-screen overflow-hidden shadow-2xl group"
      >
        

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />


        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {tAbout('feature1.title')}
            </h3>
            <p className="text-white/90 text-lg md:text-2xl leading-relaxed">
              {tAbout('feature1.desc')}
            </p>
          </motion.div>
        </div>
      </motion.div>
*/}
    </div>
  );
}
