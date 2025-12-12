'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    name: 'Monaco Yacht Show',
    location: 'Monte Carlo, Monaco',
    date: 'September 25-28, 2024',
    description: 'The world\'s leading superyacht event showcasing the finest vessels and maritime services.'
  },
  {
    id: 2,
    name: 'Cannes Yachting Festival',
    location: 'Cannes, France',
    date: 'September 10-15, 2024',
    description: 'Celebrating luxury yachting with exclusive presentations and networking opportunities.'
  },
  {
    id: 3,
    name: 'Venice Boat Show',
    location: 'Venice, Italy',
    date: 'October 12-20, 2024',
    description: 'Europe\'s premier event for innovative yachts and cutting-edge marine technology.'
  },
  {
    id: 4,
    name: 'Miami Yacht Show',
    location: 'Miami, Florida',
    date: 'February 2025',
    description: 'North America\'s most exclusive yacht show featuring the finest in luxury yachting.'
  },
  {
    id: 5,
    name: 'Fort Lauderdale Yacht Show',
    location: 'Fort Lauderdale, Florida',
    date: 'October 30 - November 3, 2024',
    description: 'The world\'s largest in-water yacht show with hundreds of luxury yachts.'
  },
  {
    id: 6,
    name: 'Genoa Boat Show',
    location: 'Genoa, Italy',
    date: 'October 3-8, 2024',
    description: 'Europe\'s largest boat show featuring sailing and motor yachts of all sizes.'
  },
];

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

export default function EventsGrid() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="w-full bg-white py-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#444444] mb-6">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-[#20B2AA] rounded-full mx-auto mb-12" />
          <p className="text-gray-700 text-xl max-w-3xl mx-auto">
            Join us at prestigious maritime events around the world.
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={item}
              className="group bg-gradient-to-br from-slate-50 to-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#20B2AA]"
            >
              {/* Event Header */}
              <div className="mb-6">
                <div className="w-12 h-1 bg-[#20B2AA] rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-2xl font-bold text-[#444444] mb-2">
                  {event.name}
                </h3>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-widest">Location</p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {event.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-widest">Date</p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {event.date}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Action Link */}
              <Link href={`/${locale}/events/${event.id}`}>
                <div className="flex items-center gap-2 text-[#20B2AA] group-hover:text-[#444444] transition-colors duration-300 font-semibold cursor-pointer">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-24"
        >
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Connect with us at upcoming boat shows and events. We'd love to meet you and discuss your yachting needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#20B2AA] hover:bg-[#444444] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Event Information
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
