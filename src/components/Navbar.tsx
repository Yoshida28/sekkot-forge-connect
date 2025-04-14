
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-sekkot-dark/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              <span className="text-sekkot-purple">SEKKOT</span> Engineering
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-sekkot-purple transition-colors">Home</Link>
            <Link to="/services" className="text-white hover:text-sekkot-purple transition-colors">Services</Link>
            <Link to="/products" className="text-white hover:text-sekkot-purple transition-colors">Products</Link>
            <Link to="/contact" className="text-white hover:text-sekkot-purple transition-colors">Contact</Link>
            <Link to="/login">
              <Button variant="outline" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-sekkot-darker/95 backdrop-blur-md mt-4 rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-sekkot-purple transition-colors px-4 py-2">Home</Link>
              <Link to="/services" className="text-white hover:text-sekkot-purple transition-colors px-4 py-2">Services</Link>
              <Link to="/products" className="text-white hover:text-sekkot-purple transition-colors px-4 py-2">Products</Link>
              <Link to="/contact" className="text-white hover:text-sekkot-purple transition-colors px-4 py-2">Contact</Link>
              <Link to="/login" className="px-4 py-2">
                <Button variant="outline" className="w-full border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
