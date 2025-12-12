'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  index: number;
}

export default function ScrollSection({ children, className = '', index }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and fade effect when next section comes
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: '200vh', // 2x height for smooth scroll
      }}
    >
      <motion.div
        className={`sticky top-0 h-screen w-full overflow-hidden ${className}`}
        style={{
          scale,
          borderRadius,
          opacity,
          zIndex: 10 + index,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
