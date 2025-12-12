'use client';

import MainLayout from '@/components/layout/MainLayout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';

export default function ServicesPage() {
  return (
    <MainLayout>
      <ServicesHero />
      <ServicesGrid />
    </MainLayout>
  );
}
