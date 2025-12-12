'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '@/components/shared/Button';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('home.hero');
  const tc = useTranslations('common');

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/videos/hero-video-yacht.mp4" type="video/mp4" />
        </video>

        {/* Ocean blue overlay - lighter */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#444444]/30 via-black/25 to-[#20B2AA]/20" />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-4 h-full flex items-center"
        style={{ opacity }}
      >
        <div className="max-w-2xl text-white">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl mb-4 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('description')}
          </motion.p>
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" variant="primary">
              {tc('exploreYachts')}
            </Button>
            <Button size="lg" variant="outline">
              {tc('contactUs')}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border-2 border-white/40 group"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform ml-1" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
