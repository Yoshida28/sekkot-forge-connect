
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-sekkot-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-24 flex items-center justify-center">
        <div className="glass-card p-12 max-w-lg text-center">
          <h1 className="text-6xl font-bold text-sekkot-purple mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
