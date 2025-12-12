'use client';

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import destinationsData from '@/data/destinations.json';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function SubDestinationDetailPage() {
  const locale = useLocale() as 'en' | 'pl';
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const subslug = typeof params?.subslug === 'string' ? params.subslug : '';

  // Find the parent destination
  const destination = destinationsData.destinations.find(d => d.slug === slug);

  // Find the subdestination
  const subDestination = destination?.subDestinations?.find(sd => sd.slug === subslug);

  if (!subDestination) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Destination not found</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={subDestination.image}
            alt={subDestination.name[locale]}
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
                {subDestination.name[locale]}
              </motion.h1>
              <motion.div
                className="text-gray-300 text-lg max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ReactMarkdown>
                  {(() => {
                    const desc = (subDestination.description as any)[locale] || subDestination.description['en'];
                    return desc.length > 200 ? `${desc.substring(0, 200)}...` : desc;
                  })()}
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#444444] mb-8">About {subDestination.name[locale]}</h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full mb-12" />
            <div className="prose prose-lg max-w-none text-gray-700 text-lg leading-relaxed">
              <ReactMarkdown>
                {(subDestination.description as any)[locale] || subDestination.description['en']}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
