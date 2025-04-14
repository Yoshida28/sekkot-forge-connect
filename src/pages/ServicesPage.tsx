
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Gauge, Clock, Settings, PackagePlus, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("forging");

  const services = [
    {
      id: "forging",
      title: "Coal Forging",
      icon: <Settings className="h-16 w-16" />,
      shortDesc: "Advanced forging processes with precise temperature control and superior finish.",
      fullDesc: "Our coal forging process combines traditional craftsmanship with modern precision. We maintain strict temperature controls throughout the forging process, ensuring optimal material properties and exceptional surface finish. Our facility is equipped with state-of-the-art hammers and presses capable of handling a wide range of materials and geometries.",
      features: [
        "Temperature-controlled forging processes",
        "Wide range of material capabilities",
        "Precision hammer and press operations",
        "Superior surface finish",
        "Comprehensive quality control"
      ],
      applications: [
        "Automotive components",
        "Industrial machinery",
        "Construction equipment",
        "Railway hardware",
        "Heavy engineering"
      ]
    },
    {
      id: "thread",
      title: "Thread Rolling",
      icon: <Gauge className="h-16 w-16" />,
      shortDesc: "High-precision thread rolling for superior thread quality and strength.",
      fullDesc: "Our thread rolling capabilities deliver exceptional thread quality with superior strength characteristics. Unlike cut threads, our rolled threads maintain the grain structure of the material, resulting in up to 30% stronger threads. Our precision equipment can produce metric, imperial, and custom thread profiles to exact specifications.",
      features: [
        "Cold-forming thread technology",
        "Metric, imperial, and custom thread profiles",
        "Enhanced thread strength and durability",
        "Precise pitch and lead accuracy",
        "High-volume production capacity"
      ],
      applications: [
        "High-strength fasteners",
        "Precision instruments",
        "Aerospace components",
        "Medical devices",
        "Critical safety hardware"
      ]
    },
    {
      id: "machining",
      title: "VMC & CNC Machining",
      icon: <Settings className="h-16 w-16" />,
      shortDesc: "State-of-the-art LD25 machines for complex geometries and tight tolerances.",
      fullDesc: "Our advanced Vertical Machining Centers (VMC) and Computer Numerical Control (CNC) machines deliver exceptional precision for complex components. Our facility features the latest LD25 machines capable of 5-axis simultaneous machining, allowing us to produce intricate geometries with tolerances as tight as ±0.005mm. Our skilled programmers and operators ensure consistent quality across production runs of any size.",
      features: [
        "5-axis simultaneous machining capability",
        "Tolerances down to ±0.005mm",
        "Complex geometry production",
        "Multiple material capabilities",
        "Advanced CAM programming"
      ],
      applications: [
        "Precision mechanical components",
        "Mold and die manufacturing",
        "Custom industrial equipment",
        "Prototype development",
        "Low to high volume production"
      ]
    },
    {
      id: "jobwork",
      title: "Precision Job Work",
      icon: <Clock className="h-16 w-16" />,
      shortDesc: "Custom machining solutions for specialized industrial applications.",
      fullDesc: "Our precision job work services cater to specialized industrial applications requiring custom solutions. We work closely with clients to understand their unique requirements and deliver components that meet or exceed specifications. Our team has extensive experience across various sectors, allowing us to provide valuable input on design for manufacturability.",
      features: [
        "Custom component development",
        "Reverse engineering capabilities",
        "Design for manufacturability consultation",
        "Comprehensive quality assurance",
        "On-time delivery commitment"
      ],
      applications: [
        "Legacy equipment maintenance",
        "Custom machinery development",
        "Specialized industrial processes",
        "Repair and reconditioning",
        "One-off prototype production"
      ]
    },
    {
      id: "oem",
      title: "OEM Development",
      icon: <PackagePlus className="h-16 w-16" />,
      shortDesc: "Comprehensive OEM part development for multiple industrial sectors.",
      fullDesc: "We partner with Original Equipment Manufacturers across multiple industrial sectors to develop and produce components that meet their exact specifications. Our comprehensive approach includes design collaboration, prototype development, testing, and full-scale production. Our expertise in materials and manufacturing processes allows us to optimize components for performance, durability, and cost-effectiveness.",
      features: [
        "Design collaboration and optimization",
        "Prototype development and testing",
        "Material selection expertise",
        "Production scalability",
        "Long-term partnership approach"
      ],
      applications: [
        "Automotive industry",
        "Industrial equipment manufacturing",
        "Energy sector components",
        "Agricultural machinery",
        "Material handling equipment"
      ]
    },
    {
      id: "export",
      title: "Export Ready",
      icon: <Truck className="h-16 w-16" />,
      shortDesc: "Global quality standards and reliable international shipping solutions.",
      fullDesc: "Our export-ready services ensure that our products meet global quality standards and reach international clients efficiently. We handle all export documentation and compliance requirements, and partner with reliable logistics providers to ensure timely delivery anywhere in the world. Our quality management system is aligned with international standards, giving our global clients confidence in our products.",
      features: [
        "International certification compliance",
        "Complete export documentation services",
        "Secure packaging for international transit",
        "Reliable logistics partnerships",
        "Global customer support"
      ],
      applications: [
        "International OEM supply chains",
        "Global industrial projects",
        "Overseas distributors and partners",
        "International infrastructure development",
        "Global manufacturing facilities"
      ]
    },
    {
      id: "quality",
      title: "Quality Assured",
      icon: <ShieldCheck className="h-16 w-16" />,
      shortDesc: "ISO certified manufacturing processes with rigorous quality control.",
      fullDesc: "Quality is at the heart of everything we do at Sekkot Engineering. Our ISO certified manufacturing processes and rigorous quality control ensure consistent excellence in every product we deliver. Our comprehensive quality management system includes incoming material inspection, in-process checks, and final verification against specifications. We maintain detailed quality records and traceability for all production batches.",
      features: [
        "ISO 9001:2015 certified processes",
        "Comprehensive quality management system",
        "Advanced measurement and testing equipment",
        "Statistical process control implementation",
        "100% final inspection protocol"
      ],
      applications: [
        "Critical safety components",
        "High-precision industrial applications",
        "Applications with zero-defect requirements",
        "Regulated industry components",
        "Performance-critical parts"
      ]
    }
  ];

  const activeService = services.find(service => service.id === activeTab) || services[0];

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
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              We provide comprehensive engineering solutions with a focus on precision, quality, and innovation to meet the diverse needs of our global clients.
            </p>
          </div>
          
          <Tabs 
            defaultValue="forging" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-x-auto pb-4">
              <TabsList className="bg-sekkot-darker h-auto p-1 inline-flex whitespace-nowrap min-w-full justify-start md:justify-center">
                {services.map(service => (
                  <TabsTrigger 
                    key={service.id} 
                    value={service.id}
                    className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {services.map(service => (
              <TabsContent key={service.id} value={service.id} className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="glass-card p-8 h-full flex flex-col items-center text-center">
                      <div className="text-sekkot-purple mb-6">
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                      <p className="text-gray-300 mb-6">{service.shortDesc}</p>
                      <Link to="/contact" className="mt-auto">
                        <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
                          Request Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="glass-card p-8">
                      <h3 className="text-xl font-semibold mb-4">Overview</h3>
                      <p className="text-gray-300 mb-6">{service.fullDesc}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-sekkot-purple">Features</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-sekkot-purple mr-2">•</span>
                                <span className="text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-sekkot-purple">Applications</h4>
                          <ul className="space-y-2">
                            {service.applications.map((application, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-sekkot-purple mr-2">•</span>
                                <span className="text-gray-300">{application}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to Discuss Your Project?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to understand your specific requirements and provide tailored solutions that meet your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
              <Link to="/request-form">
                <Button variant="outline" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white w-full sm:w-auto">
                  Submit a Request
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

export default ServicesPage;
