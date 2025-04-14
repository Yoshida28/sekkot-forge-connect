
import { ShieldCheck, Gauge, Clock, Settings, PackagePlus, Truck } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="glass-card p-6 hover-scale">
      <div className="text-sekkot-purple mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Coal Forging",
      description: "Advanced forging processes with precise temperature control and superior finish."
    },
    {
      icon: <Gauge className="h-10 w-10" />,
      title: "Thread Rolling",
      description: "High-precision thread rolling for superior thread quality and strength."
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: "VMC & CNC Machining",
      description: "State-of-the-art LD25 machines for complex geometries and tight tolerances."
    },
    {
      icon: <PackagePlus className="h-10 w-10" />,
      title: "OEM Development",
      description: "Comprehensive OEM part development for multiple industrial sectors."
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Quality Assured",
      description: "ISO certified manufacturing processes with rigorous quality control."
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Export Ready",
      description: "Global quality standards and reliable international shipping solutions."
    },
  ];

  return (
    <section className="py-20 bg-sekkot-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            We provide end-to-end engineering solutions with a focus on precision, quality, and timely delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
