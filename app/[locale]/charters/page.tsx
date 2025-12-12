'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ChartersHero from '@/components/charters/ChartersHero';
import FeaturedCharter from '@/components/charters/FeaturedCharter';
import ChartersGrid from '@/components/charters/ChartersGrid';

export default function ChartersPage() {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 50000,
    yachtSize: '',
    yachtType: '',
    guests: '',
    location: '',
    yachtName: '',
  });

  return (
    <MainLayout>
      <FeaturedCharter />
      <ChartersGrid filters={filters} />
    </MainLayout>
  );
}
