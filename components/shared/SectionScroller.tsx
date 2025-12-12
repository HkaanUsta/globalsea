'use client';

import { useEffect, useState } from 'react';

export default function SectionScroller() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.main-section');
    console.log('📊 Found sections:', sections.length);
    sections.forEach((section, i) => {
      const styles = window.getComputedStyle(section);
      console.log(`Section ${i}:`, {
        position: styles.position,
        top: styles.top,
        zIndex: styles.zIndex,
        height: styles.height
      });
    });

    const handleWheel = (e: WheelEvent) => {
      // Scrolling yapılıyorsa yeni scroll'u engelle
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // Scroll yönünü belirle
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      // Sınırları kontrol et
      if (nextIndex < 0 || nextIndex >= sections.length) {
        return;
      }

      // Scroll işlemini başlat
      setIsScrolling(true);
      setCurrentIndex(nextIndex);

      // Hedef section'a git
      sections[nextIndex].scrollIntoView({ behavior: 'smooth' });

      // 1 saniye sonra yeni scroll'a izin ver
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, isScrolling]);

  return null;
}
