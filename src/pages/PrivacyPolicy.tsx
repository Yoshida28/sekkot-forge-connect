
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const PrivacyPolicy = () => {
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
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              Last updated: April 14, 2025
            </p>
          </div>
          
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-300 mb-6">
              At Sekkot Engineering Export India Pvt Ltd ("Sekkot," "we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-gray-300 mb-6">
              Please read this privacy policy carefully. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by the terms of this privacy policy.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">2. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 pl-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Billing address</li>
              <li>Account credentials (username and password)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">2.2 Non-Personal Information</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>Browser type</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar technologies</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-6">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>Providing and maintaining our services</li>
              <li>Processing and fulfilling your orders</li>
              <li>Communicating with you about our products and services</li>
              <li>Responding to your inquiries and service requests</li>
              <li>Sending administrative information</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Analyzing usage patterns</li>
              <li>Detecting and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-6">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-4">We may share your information with the following parties:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we offer co-branded services or products</li>
              <li>Affiliates and subsidiaries</li>
              <li>Legal authorities when required by law</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-6">5. Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">6. Your Rights</h2>
            <p className="text-gray-300 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 pl-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="text-gray-300 mb-6">
              To exercise these rights, please contact us at privacy@sekkot.com.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">7. Cookies and Similar Technologies</h2>
            <p className="text-gray-300 mb-6">
              We use cookies and similar technologies to enhance your experience on our website, analyze usage patterns, and deliver personalized content. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">8. International Data Transfers</h2>
            <p className="text-gray-300 mb-6">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate measures to ensure that your personal information receives an adequate level of protection.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this privacy policy from time to time. The latest version will be posted on this page with the effective date. We encourage you to review this privacy policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">10. Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
            </p>
            <address className="text-gray-300 mb-6 not-italic">
              Sekkot Engineering Export India Pvt Ltd<br />
              123 Industrial Area<br />
              Mumbai, Maharashtra, India - 400001<br />
              Email: privacy@sekkot.com<br />
              Phone: +91 1234567890
            </address>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
