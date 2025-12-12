'use client';

import MainLayout from '@/components/layout/MainLayout';
import EventsHero from '@/components/events/EventsHero';
import EventsGrid from '@/components/events/EventsGrid';

export default function EventsPage() {
  return (
    <MainLayout>
      <EventsHero />
      <EventsGrid />
    </MainLayout>
  );
}
