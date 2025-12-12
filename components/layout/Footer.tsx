'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const quickLinks = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.charters'), href: `/${locale}/charters` },
    { name: t('nav.destinations'), href: `/${locale}/destinations` },
    { name: t('nav.services'), href: `/${locale}/services` },
    { name: 'Events', href: `/${locale}/events` },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80"
          alt="Ocean background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gray-900/75" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Contact Section at Top */}
        <div className="text-center mb-16 pb-16 border-b border-white/20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Interested in a charter? Contact us for more details about availability, pricing, and custom packages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Phone */}
            <div className="text-center">
              <p className="text-gray-300 text-lg mb-3">Phone</p>
              <a href="tel:+48123456789" className="text-2xl font-semibold text-white hover:text-[#20B2AA] transition">
                +48 123 456 789
              </a>
            </div>
            {/* Email */}
            <div className="text-center">
              <p className="text-gray-300 text-lg mb-3">Email</p>
              <a href="mailto:info@globalsea.com" className="text-2xl font-semibold text-white hover:text-[#20B2AA] transition">
                info@globalsea.com
              </a>
            </div>
          </div>
        </div>

        {/* Simplified Layout - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-4 group">
              <div className="relative w-16 h-16 group-hover:scale-110 transition-transform">
                <Image
                  src="/images/logo.png"
                  alt="Global Sea Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#20B2AA] transition-all duration-300 text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#20B2AA] transition-all duration-300 text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition inline-block font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              About Us
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience luxury yacht charters and unforgettable maritime adventures with Global Sea.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Global Sea. {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition font-medium">
              {t('footer.privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition font-medium">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
