
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sekkot-darker pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">SEKKOT Engineering</h3>
            <p className="text-gray-400 mb-6">
              Precision engineering and export solutions with a commitment to quality, innovation, and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sekkot-purple transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sekkot-purple transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sekkot-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sekkot-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sekkot-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-sekkot-purple transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-sekkot-purple transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-sekkot-purple transition-colors">Login</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">Coal Forging</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">Thread Rolling</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">VMC & CNC Machining</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">Precision Job Work</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-sekkot-purple transition-colors">OEM Development</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-sekkot-purple mr-3 mt-1" />
                <span className="text-gray-400">123 Industrial Area, Mumbai, Maharashtra, India - 400001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-sekkot-purple mr-3" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-sekkot-purple mr-3" />
                <span className="text-gray-400">info@sekkot.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-sekkot-purple mr-3" />
                <span className="text-gray-400">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sekkot-gray/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Sekkot Engineering Export India Pvt Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 text-sm hover:text-sekkot-purple transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 text-sm hover:text-sekkot-purple transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
