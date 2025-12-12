'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ServiceDetailProps {
  service: {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    contentTitle: string;
    contentDescription: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    whyChooseUs: Array<{
      title: string;
      description: string;
    }>;
    featureImages?: string[];
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  // Default feature images if not provided
  const featureImages = service.featureImages || [
    '/images/services/yacht-management-1.jpg',
    '/images/services/charter-management-1.jpg',
    '/images/services/yacht-insurance-1.jpg',
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[500px] md:h-[600px]"
      >
        <Image
          src={service.heroImage}
          alt={service.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {service.heroTitle}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl">
              {service.heroDescription}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section with Image */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-start">
              <h2 className="text-5xl md:text-6xl font-bold text-[#444444] mb-6">
                {service.contentTitle}
              </h2>
              <div className="w-24 h-1 bg-[#20B2AA] rounded-full mb-12" />
            </div>
            <p className="text-gray-700 text-xl leading-relaxed">
              {service.contentDescription}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={featureImages[0]}
              alt={service.contentTitle}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Features Section with Images */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Feature Image */}
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src={featureImages[index] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Feature Content */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-[#444444] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section with Images */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#444444] mb-6">
              Why Choose Global Sea?
            </h2>
            <div className="w-24 h-1 bg-[#20B2AA] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {service.whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Large Number Background */}
                <div className="relative mb-6 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#20B2AA]/10 to-[#444444]/10 rounded-lg" />
                  <div className="relative text-7xl font-bold text-[#20B2AA]">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#444444] mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full Width Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={featureImages[1] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=80'}
            alt="Global Sea Service"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
