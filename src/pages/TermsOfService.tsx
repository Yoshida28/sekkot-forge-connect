
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const TermsOfService = () => {
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
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              Last updated: April 14, 2025
            </p>
          </div>
          
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing or using the website and services of Sekkot Engineering Export India Pvt Ltd ("Sekkot," "we," "us," or "our"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this website.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">2. Description of Services</h2>
            <p className="text-gray-300 mb-6">
              Sekkot Engineering provides engineering services, including but not limited to coal forging, thread rolling, VMC & CNC machining, precision job work, OEM development, and export services. These Terms of Service apply to all users of the website and services, including customers, visitors, and business partners.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">3. User Accounts</h2>
            <p className="text-gray-300 mb-4">
              To access certain features of the website, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>Provide accurate, current, and complete information during the registration process</li>
              <li>Maintain and promptly update your account information as needed</li>
              <li>Keep your account credentials confidential and not share them with third parties</li>
              <li>Be responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-6">4. Intellectual Property</h2>
            <p className="text-gray-300 mb-6">
              All content on the website, including text, graphics, logos, images, software, and other materials, are the property of Sekkot Engineering or its licensors and are protected by intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works of such content without our express written permission.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">5. Product Information and Orders</h2>
            <p className="text-gray-300 mb-4">
              We strive to provide accurate product information, but we do not warrant that product descriptions or other content on our website are accurate, complete, reliable, current, or error-free. Regarding orders:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>All orders are subject to acceptance and availability</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to refuse or cancel any order for any reason</li>
              <li>Payment terms will be specified in quotations and invoices</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-6">6. Custom Requests and Specifications</h2>
            <p className="text-gray-300 mb-6">
              For custom engineering requests, the customer is responsible for providing accurate specifications. Sekkot Engineering will manufacture according to the approved specifications, and any changes to specifications after production has begun may result in additional charges and delays.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">7. Quality and Warranty</h2>
            <p className="text-gray-300 mb-6">
              We warrant that our products will be free from defects in materials and workmanship for a period specified in the product documentation. This warranty does not cover damage resulting from misuse, accidents, modifications, or unauthorized repairs. The customer must inspect products upon delivery and notify us of any defects within a reasonable time.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">8. Limitation of Liability</h2>
            <p className="text-gray-300 mb-6">
              To the fullest extent permitted by law, Sekkot Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, regardless of the theory of liability, even if we have been advised of the possibility of such damages.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">9. Indemnification</h2>
            <p className="text-gray-300 mb-6">
              You agree to indemnify, defend, and hold harmless Sekkot Engineering and its officers, directors, employees, agents, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Service or your use of the website and services.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">10. Governing Law and Jurisdiction</h2>
            <p className="text-gray-300 mb-6">
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any dispute arising under or related to these Terms of Service shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">11. Export Compliance</h2>
            <p className="text-gray-300 mb-6">
              Our products may be subject to export control laws and regulations. You agree to comply with all applicable international and national laws that apply to any products purchased from us, including export control regulations.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">12. Force Majeure</h2>
            <p className="text-gray-300 mb-6">
              Sekkot Engineering shall not be liable for any delay or failure to perform its obligations resulting from causes beyond our reasonable control, including but not limited to acts of God, natural disasters, wars, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">13. Modifications to Terms of Service</h2>
            <p className="text-gray-300 mb-6">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website and services after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">14. Severability</h2>
            <p className="text-gray-300 mb-6">
              If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">15. Contact Information</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions or concerns about these Terms of Service, please contact us at:
            </p>
            <address className="text-gray-300 mb-6 not-italic">
              Sekkot Engineering Export India Pvt Ltd<br />
              123 Industrial Area<br />
              Mumbai, Maharashtra, India - 400001<br />
              Email: legal@sekkot.com<br />
              Phone: +91 1234567890
            </address>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
