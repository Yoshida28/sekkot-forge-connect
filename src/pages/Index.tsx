
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import ProductsGallery from '@/components/ProductsGallery';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-sekkot-dark text-white">
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProductsGallery />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
