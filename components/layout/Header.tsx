'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;

  // Detect scroll position and direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set isScrolled to true when user scrolls past the Hero section
      setIsScrolled(currentScrollY > window.innerHeight * 0.8);

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('charters'), href: `/${locale}/charters` },
    { name: t('destinations'), href: `/${locale}/destinations` },
    { name: t('services'), href: `/${locale}/services` },
    { name: 'Events', href: `/${locale}/events` },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent backdrop-blur-0'
        } ${
          isVisible ? 'top-0' : '-top-32'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-32">
            {/* Logo */}
            <Link href={`/${locale}`} className="group">
              <div className="relative w-16 h-16 lg:w-24 lg:h-24 group-hover:scale-110 transition-transform">
                <Image
                  src="/images/logo.png"
                  alt="Global Sea Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-semibold text-lg transition-colors relative group ${
                    isScrolled
                      ? 'text-gray-700 hover:text-[#20B2AA]'
                      : 'text-white hover:text-[#20B2AA]'
                  }`}
                >
                  {item.name.toUpperCase()}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    isScrolled ? 'bg-[#20B2AA]' : 'bg-[#20B2AA]'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Language Switcher, Phone & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Phone Button */}
              <a
                href="tel:+48123456789"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isScrolled
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                }`}
                title="Call us"
              >
                <Phone className={`w-5 h-5 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                <span className={`text-sm ${isScrolled ? 'text-gray-700' : 'text-white'}`}>+48 123 456 789</span>
              </a>

              <div className="hidden md:block">
                <LanguageSwitcher transparent={!isScrolled} />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition ${
                  isScrolled
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Outside header to stay visible when header hides */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-20 bottom-0 bg-white backdrop-blur-lg overflow-y-auto z-[101] shadow-xl">
          <div className="flex flex-col gap-2 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-4 text-gray-800 hover:bg-[#20B2AA]/10 hover:text-[#20B2AA] rounded-lg transition font-medium text-lg"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 py-4 md:hidden border-t border-gray-200 mt-4 pt-4">
              <LanguageSwitcher transparent={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
