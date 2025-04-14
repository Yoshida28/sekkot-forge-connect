import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Zap, Tool, TrendingUp, BarChart, Award, PenTool, Box, MapPin, Truck, Clock, DollarSign, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              Explore our comprehensive range of engineering services designed to meet your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="glass-card p-6 hover-scale">
              <CheckCircle2 className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Precision Machining</h2>
              <p className="text-gray-300 mb-4">
                High-accuracy machining services for complex parts and components.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>CNC Milling</li>
                <li>CNC Turning</li>
                <li>Grinding</li>
                <li>EDM</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Learn More
              </Button>
            </div>
            
            {/* Service Card 2 */}
            <div className="glass-card p-6 hover-scale">
              <Zap className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Rapid Prototyping</h2>
              <p className="text-gray-300 mb-4">
                Fast and efficient prototyping to bring your ideas to life.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>3D Printing</li>
                <li>SLA/SLS</li>
                <li>CNC Prototyping</li>
                <li>Vacuum Casting</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Explore Now
              </Button>
            </div>
            
            {/* Service Card 3 */}
            <div className="glass-card p-6 hover-scale">
              <Tool className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Tool and Die Making</h2>
              <p className="text-gray-300 mb-4">
                Custom tool and die solutions for manufacturing processes.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>Injection Molds</li>
                <li>Progressive Dies</li>
                <li>Casting Dies</li>
                <li>Fixtures & Gages</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Get a Quote
              </Button>
            </div>
            
            {/* Service Card 4 */}
            <div className="glass-card p-6 hover-scale">
              <TrendingUp className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Reverse Engineering</h2>
              <p className="text-gray-300 mb-4">
                Recreate parts from existing samples or designs.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>3D Scanning</li>
                <li>CAD Modeling</li>
                <li>Part Replication</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Inquire Now
              </Button>
            </div>
            
            {/* Service Card 5 */}
            <div className="glass-card p-6 hover-scale">
              <BarChart className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Quality Control & Inspection</h2>
              <p className="text-gray-300 mb-4">
                Ensuring the highest standards of quality for your products.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>CMM Inspection</li>
                <li>Material Testing</li>
                <li>Dimensional Analysis</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Request Inspection
              </Button>
            </div>
            
            {/* Service Card 6 */}
            <div className="glass-card p-6 hover-scale">
              <Award className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Surface Treatment & Finishing</h2>
              <p className="text-gray-300 mb-4">
                Enhance the durability and aesthetics of your parts.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>Anodizing</li>
                <li>Powder Coating</li>
                <li>Plating</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                View Options
              </Button>
            </div>

            {/* Service Card 7 */}
            <div className="glass-card p-6 hover-scale">
              <PenTool className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">CAD/CAM Design</h2>
              <p className="text-gray-300 mb-4">
                Expert design services to optimize your product's form and function.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>3D Modeling</li>
                <li>Simulation</li>
                <li>Design Optimization</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Explore Design
              </Button>
            </div>

            {/* Service Card 8 */}
            <div className="glass-card p-6 hover-scale">
              <Box className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Assembly & Integration</h2>
              <p className="text-gray-300 mb-4">
                Comprehensive assembly services to bring your components together.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>Mechanical Assembly</li>
                <li>Electrical Integration</li>
                <li>Testing & Validation</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Discover Assembly
              </Button>
            </div>

            {/* Service Card 9 */}
            <div className="glass-card p-6 hover-scale">
              <Shield className="h-8 w-8 text-sekkot-purple mb-4" />
              <h2 className="text-xl font-semibold mb-2">Consulting Services</h2>
              <p className="text-gray-300 mb-4">
                Expert advice and guidance to optimize your manufacturing processes.
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>Process Optimization</li>
                <li>Material Selection</li>
                <li>Cost Reduction</li>
              </ul>
              <Button as={Link} to="/contact" className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                Book Consultation
              </Button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              Contact us today to discuss your project requirements and discover how we can help you achieve your goals.
            </p>
            <Button as={Link} to="/contact" className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
