'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const servicesList = [
  {
    id: 1,
    slug: 'yacht-management',
    title: 'Yacht Management',
    image: '/images/services/yacht-management-1.jpg',
    description: 'Complete yacht management services'
  },
  {
    id: 2,
    slug: 'charter-management',
    title: 'Charter Management',
    image: '/images/services/charter-management-1.jpg',
    description: 'Maximize your charter yacht income'
  },
  {
    id: 3,
    slug: 'yacht-insurance',
    title: 'Yacht Insurance',
    image: '/images/services/yacht-insurance-1.jpg',
    description: 'Comprehensive insurance solutions'
  },
  {
    id: 4,
    slug: 'yacht-marketing',
    title: 'Yacht Marketing',
    image: '/images/services/yacht-marketing-1.jpg',
    description: 'Strategic marketing for your yacht'
  },
  {
    id: 5,
    slug: 'sales-management',
    title: 'Sales Management',
    image: '/images/services/sales-management-1.jpg',
    description: 'Expert yacht sales services'
  },
  {
    id: 6,
    slug: 'berths-for-sale',
    title: 'Berths for Sale',
    image: '/images/services/berths-for-sale-1.jpg',
    description: 'Premium berth ownership opportunities'
  },
  {
    id: 7,
    slug: 'procurement',
    title: 'Procurement',
    image: '/images/services/procurement-1.jpg',
    description: 'Yacht supplies and equipment sourcing'
  },
  {
    id: 8,
    slug: 'crew-services',
    title: 'Crew Services',
    image: '/images/services/crew-services-1.jpg',
    description: 'Professional crew selection and management'
  },
];

export default function ServicesGrid() {
  const locale = useLocale();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-white">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 py-24"
      >
        {servicesList.map((service) => (
          <motion.div key={service.id} variants={item}>
            <Link href={`/${locale}/services/${service.slug}`}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-96">
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Underline */}
                    <div className="w-12 h-1 bg-[#20B2AA] rounded-full mb-4 group-hover:w-16 transition-all duration-300" />

                    {/* Title */}
                    <h3 className="text-3xl font-bold mb-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
