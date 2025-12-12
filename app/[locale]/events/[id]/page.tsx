'use client';

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Calendar, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    name: 'Monaco Yacht Show',
    location: 'Monte Carlo, Monaco',
    date: 'September 25-28, 2024',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
    description: 'The world\'s leading superyacht event showcasing the finest vessels and maritime services.',
    details: 'The Monaco Yacht Show is the international meeting place for the elite in the yachting industry. It attracts captains, yacht owners, shipyards, and maritime service providers from around the world. This event showcases the latest innovations in superyacht design and technology.'
  },
  {
    id: 2,
    name: 'Cannes Yachting Festival',
    location: 'Cannes, France',
    date: 'September 10-15, 2024',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    description: 'Celebrating luxury yachting with exclusive presentations and networking opportunities.',
    details: 'The Cannes Yachting Festival is one of Europe\'s most prestigious yachting events, featuring luxury superyachts and exceptional maritime services. It\'s a perfect opportunity to discover new vessels and connect with industry professionals.'
  },
  {
    id: 3,
    name: 'Venice Boat Show',
    location: 'Venice, Italy',
    date: 'October 12-20, 2024',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    description: 'Europe\'s premier event for innovative yachts and cutting-edge marine technology.',
    details: 'The Venice Boat Show brings together boat builders, dealers, and suppliers showcasing the latest in yachting technology and design. It\'s a hub for discovering new innovations in the maritime industry.'
  },
  {
    id: 4,
    name: 'Miami Yacht Show',
    location: 'Miami, Florida',
    date: 'February 2025',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
    description: 'North America\'s most exclusive yacht show featuring the finest in luxury yachting.',
    details: 'The Miami Yacht Show is North America\'s premier venue for superyachts, featuring luxury vessels, cutting-edge technology, and exclusive networking opportunities with industry leaders and yacht enthusiasts.'
  },
  {
    id: 5,
    name: 'Fort Lauderdale Yacht Show',
    location: 'Fort Lauderdale, Florida',
    date: 'October 30 - November 3, 2024',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    description: 'The world\'s largest in-water yacht show with hundreds of luxury yachts.',
    details: 'The Fort Lauderdale Yacht Show is the world\'s largest in-water yacht show, featuring hundreds of luxury yachts, innovative maritime services, and exclusive networking opportunities for yacht buyers and enthusiasts.'
  },
  {
    id: 6,
    name: 'Genoa Boat Show',
    location: 'Genoa, Italy',
    date: 'October 3-8, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
    description: 'Europe\'s largest boat show featuring sailing and motor yachts of all sizes.',
    details: 'The Genoa Boat Show is Europe\'s largest boat show, showcasing a wide variety of sailing and motor yachts, marine equipment, and services. It\'s a premier venue for discovering the latest in yachting technology and design.'
  },
];

export default function EventDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Event not found</h1>
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
            src={event.image}
            alt={event.name}
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
                {event.name}
              </motion.h1>
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-gray-300 text-lg">📍 {event.location}</p>
                <p className="text-gray-300 text-lg">📅 {event.date}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Date and Location Section */}
      <div className="py-12 bg-[#F5F3F0]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            {/* Date */}
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-[#20B2AA]/10 flex items-center justify-center mr-4 group-hover:bg-[#20B2AA]/20 transition-all duration-300">
                <svg className="w-5 h-5 text-[#20B2AA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[#444444]/60 text-sm mb-1">Date</p>
                <p className="text-[#444444] font-medium">{event.date}</p>
                <p className="text-[#444444]/70 text-sm mt-1">8 days</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-[#20B2AA]/10 flex items-center justify-center mr-4 group-hover:bg-[#20B2AA]/20 transition-all duration-300">
                <svg className="w-5 h-5 text-[#20B2AA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v10m0 0l6-6m-6 6l-6-6" />
                </svg>
              </div>
              <div>
                <p className="text-[#444444]/60 text-sm mb-1">Location</p>
                <p className="text-[#444444] font-medium">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#20B2AA]/30 to-transparent" />
        </div>
      </div>

      {/* Details Section */}
      <div className="py-12 bg-[#F5F3F0]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#444444] mb-8 text-center">
            About The Event
          </h2>

          <div className="relative">
            {/* Top-left corner line */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#20B2AA]/40 -ml-2 -mt-2" />

            {/* Bottom-right corner line */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#20B2AA]/40 -mr-2 -mb-2" />

            <div className="py-10 px-8 md:px-12">
              <p className="text-[#444444]/80 leading-relaxed whitespace-pre-line">
                {event.description}

{event.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
