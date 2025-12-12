'use client';

import MainLayout from '@/components/layout/MainLayout';
import YachtDetail from '@/components/charters/YachtDetail';
import yachtsData from '@/data/yachts.json';
import { useParams } from 'next/navigation';

export default function YachtDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const yacht = yachtsData.yachts.find(y => y.slug === slug);

  if (!yacht) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Yacht not found</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <YachtDetail yacht={yacht} />
    </MainLayout>
  );
}
