import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeaturedYachts from '@/components/home/FeaturedYachts';
import AboutUs from '@/components/home/AboutUs';
import DestinationPreview from '@/components/home/DestinationPreview';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <FeaturedYachts />
      <AboutUs />
      <DestinationPreview />
    </MainLayout>
  );
}
