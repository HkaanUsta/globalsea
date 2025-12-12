'use client';

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import destinationsData from '@/data/destinations.json';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function DestinationDetailPage() {
  const locale = useLocale() as 'en' | 'pl';
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const destination = destinationsData.destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Destination not found</h1>
        </div>
      </MainLayout>
    );
  }

  const subDestinations = destination.subDestinations || [];

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name[locale]}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-8 md:px-16 pb-20 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {destination.name[locale]}
              </motion.h1>
              <motion.div
                className="text-gray-300 text-lg max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ReactMarkdown>
                  {destination.description[locale].length > 200
                    ? `${destination.description[locale].substring(0, 200)}...`
                    : destination.description[locale]}
                </ReactMarkdown>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full bg-white py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#444444] mb-8">About {destination.name[locale]}</h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full mb-12" />
            <div className="prose prose-lg max-w-none text-gray-700 text-lg leading-relaxed">
              <ReactMarkdown>{destination.description[locale]}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sub-Destinations Section */}
      {subDestinations.length > 0 && (
        <div className="w-full bg-white pt-24">
          <div className="text-center mb-12 px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#444444] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Explore More
            </motion.h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full mx-auto" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subDestinations.map((sub, idx) => (
              <Link key={sub.id} href={`/${locale}/destinations/${slug}/${sub.slug}`}>
                <motion.div
                  className="relative h-[600px] group overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={sub.image}
                    alt={sub.name[locale]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                    <motion.div
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center max-w-md"
                    >
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {sub.name[locale]}
                      </h3>
                      <div className="text-gray-300 text-base md:text-lg leading-relaxed">
                        <ReactMarkdown>
                          {(() => {
                            const desc = (sub.description as any)[locale] || sub.description['en'];
                            return desc.length > 150 ? `${desc.substring(0, 150)}...` : desc;
                          })()}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
}
