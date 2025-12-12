'use client';

import MainLayout from '@/components/layout/MainLayout';
import DestinationsHero from '@/components/destinations/DestinationsHero';
import DestinationsGrid from '@/components/destinations/DestinationsGrid';

export default function DestinationsPage() {
  return (
    <MainLayout>
      <DestinationsHero />
      <DestinationsGrid filters={{ priceMin: 0, priceMax: 100000 }} />
    </MainLayout>
  );
}
