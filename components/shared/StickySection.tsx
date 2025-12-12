'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  zIndex: number;
}

export default function StickySection({ children, className = '', zIndex }: StickySectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Slow fade out and scale as next section comes
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section
      ref={ref}
      className={`sticky top-0 h-screen w-full section-snap ${className}`}
      style={{
        zIndex,
        opacity,
        scale,
      }}
    >
      {children}
    </motion.section>
  );
}
