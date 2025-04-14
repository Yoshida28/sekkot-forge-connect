
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  History, 
  GraduationCap, 
  Building2, 
  Factory,
  Truck,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-sekkot-dark text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Sekkot Engineering</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              A trusted leader in precision engineering and export solutions with a commitment to excellence since 1995.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 1995, Sekkot Engineering began as a small precision machining workshop with a vision to deliver world-class engineering solutions to both domestic and international markets.
              </p>
              <p className="text-gray-300 mb-4">
                Over the decades, we have grown into a comprehensive engineering solutions provider with state-of-the-art manufacturing facilities and a global client base spanning multiple industries.
              </p>
              <p className="text-gray-300 mb-6">
                Today, Sekkot Engineering stands as a testament to quality, precision, and reliability in the engineering industry, with a dedicated team of over 100 skilled professionals committed to excellence in every component we manufacture.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-sekkot-purple mr-2" />
                  <span className="text-gray-200">ISO Certified</span>
                </div>
                <div className="flex items-center">
                  <Factory className="h-5 w-5 text-sekkot-purple mr-2" />
                  <span className="text-gray-200">Modern Facilities</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-sekkot-purple mr-2" />
                  <span className="text-gray-200">Expert Engineers</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-sekkot-purple mr-2" />
                  <span className="text-gray-200">Global Exports</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-0 overflow-hidden h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1581092921461-21d4c6b8c6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Sekkot Engineering Factory" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <Tabs defaultValue="mission" className="mb-16">
            <TabsList className="bg-sekkot-darker h-auto p-1 grid grid-cols-3 w-full max-w-xl mx-auto">
              <TabsTrigger 
                value="mission"
                className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
              >
                Mission
              </TabsTrigger>
              <TabsTrigger 
                value="vision"
                className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
              >
                Vision
              </TabsTrigger>
              <TabsTrigger 
                value="values"
                className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
              >
                Values
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mission" className="mt-8">
              <div className="glass-card p-8 text-center">
                <Target className="h-16 w-16 text-sekkot-purple mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  To deliver precision-engineered components and solutions that exceed client expectations in quality, reliability, and performance while fostering innovation and sustainable manufacturing practices.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="vision" className="mt-8">
              <div className="glass-card p-8 text-center">
                <Target className="h-16 w-16 text-sekkot-purple mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  To be a globally recognized leader in precision engineering, known for technical excellence, innovation, and unwavering commitment to quality, creating long-term value for our clients, employees, and society.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="values" className="mt-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-sekkot-darker p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-sekkot-purple" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Excellence</h4>
                    <p className="text-gray-300">Striving for perfection in every component we manufacture</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-sekkot-darker p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-sekkot-purple" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Precision</h4>
                    <p className="text-gray-300">Unwavering attention to detail in every process</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-sekkot-darker p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-sekkot-purple" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Integrity</h4>
                    <p className="text-gray-300">Honest and ethical conduct in all our dealings</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-sekkot-darker p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <History className="h-8 w-8 text-sekkot-purple" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Innovation</h4>
                    <p className="text-gray-300">Continuous improvement and embracing new technologies</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-sekkot-purple mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Rajesh Kumar</h3>
                <p className="text-sekkot-purple mb-4">Founder & CEO</p>
                <p className="text-gray-300 text-sm">
                  With over 30 years of experience in precision engineering, Rajesh leads the company with a focus on innovation and quality excellence.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-sekkot-purple mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Priya Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Priya Sharma</h3>
                <p className="text-sekkot-purple mb-4">Technical Director</p>
                <p className="text-gray-300 text-sm">
                  Priya oversees all technical operations, bringing her expertise in advanced manufacturing technologies and process optimization.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-sekkot-purple mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/59.jpg" 
                    alt="Vikram Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Vikram Patel</h3>
                <p className="text-sekkot-purple mb-4">Export Manager</p>
                <p className="text-gray-300 text-sm">
                  Vikram manages our global export operations, ensuring smooth logistics and compliance with international trade regulations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
            <div className="glass-card p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">State-of-the-Art Manufacturing</h3>
                  <p className="text-gray-300 mb-4">
                    Our 25,000 sq. ft. manufacturing facility is equipped with the latest machinery and technology to deliver precision-engineered components. From advanced CNC machines to specialized forging equipment, we have invested in the best tools to ensure superior quality.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-sekkot-purple mr-2">•</span>
                      <span className="text-gray-300">10+ CNC/VMC Machines with 5-axis capability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sekkot-purple mr-2">•</span>
                      <span className="text-gray-300">Advanced coal forging units with precise temperature control</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sekkot-purple mr-2">•</span>
                      <span className="text-gray-300">High-precision thread rolling equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sekkot-purple mr-2">•</span>
                      <span className="text-gray-300">Comprehensive quality control lab with CMM</span>
                    </li>
                  </ul>
                  <Link to="/contact">
                    <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
                      Schedule a Visit
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1565361830137-1a99b72a6204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="CNC Machine" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1589792923962-537704632910?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Manufacturing Floor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                      alt="Quality Control" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1473621038790-b778b4750efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" 
                      alt="Forging Process" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Certifications & Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <Award className="h-12 w-12 text-sekkot-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">ISO 9001:2015</h3>
                <p className="text-gray-300">
                  Certified for our quality management system, ensuring consistent, high-quality products and services.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <Award className="h-12 w-12 text-sekkot-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">ISO 14001:2015</h3>
                <p className="text-gray-300">
                  Environmental management certification, demonstrating our commitment to sustainable manufacturing.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <Award className="h-12 w-12 text-sekkot-purple mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">OHSAS 18001</h3>
                <p className="text-gray-300">
                  Occupational Health and Safety management certification, ensuring a safe workplace.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you need precision components, OEM development, or custom engineering solutions, our team is ready to bring your requirements to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
              <Link to="/request-form">
                <Button variant="outline" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white w-full sm:w-auto">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
