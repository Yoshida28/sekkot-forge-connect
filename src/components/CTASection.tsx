
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-sekkot-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sekkot-purple/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Discuss Your Custom Requirements?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you need standard components or custom engineering solutions, we're here to deliver excellence for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-sekkot-purple hover:bg-sekkot-purple-dark text-white group">
              <Link to="/login" className="flex items-center">
                Submit Request
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
              <Link to="/contact">Contact Sales Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
