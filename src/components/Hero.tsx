
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-sekkot-dark z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-sekkot-darker to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8 max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Precision Engineering</span>
              <br />
              <span className="fancy-gradient bg-clip-text text-transparent">Excellence in Export</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Specializing in coal forging, thread rolling, CNC machining, and custom components 
              with ISO certified quality for global industrial needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sekkot-purple hover:bg-sekkot-purple-dark text-white">
                <Link to="/products" className="flex items-center">
                  View Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="glass-card p-6 animate-scale-in">
                <h2 className="text-2xl font-bold text-sekkot-purple mb-4">Industry Leaders In:</h2>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-sekkot-purple/20 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sekkot-purple text-sm">✓</span>
                    </div>
                    <span>Advanced Coal Forging Processes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-sekkot-purple/20 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sekkot-purple text-sm">✓</span>
                    </div>
                    <span>High-Precision Thread Rolling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-sekkot-purple/20 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sekkot-purple text-sm">✓</span>
                    </div>
                    <span>State-of-the-art CNC Machining</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-sekkot-purple/20 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sekkot-purple text-sm">✓</span>
                    </div>
                    <span>ISO Certified Manufacturing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-sekkot-purple/20 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sekkot-purple text-sm">✓</span>
                    </div>
                    <span>Custom OEM Part Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
