
import { Users, Timer, ShieldCheck, Globe } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sekkot-purple mb-3">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-sekkot-dark to-sekkot-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-card py-12 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem 
              icon={<Users className="h-10 w-10" />}
              value="20+"
              label="Years Experience"
            />
            <StatItem 
              icon={<ShieldCheck className="h-10 w-10" />}
              value="ISO"
              label="Certified Quality"
            />
            <StatItem 
              icon={<Globe className="h-10 w-10" />}
              value="30+"
              label="Countries Exported"
            />
            <StatItem 
              icon={<Timer className="h-10 w-10" />}
              value="98%"
              label="On-Time Delivery"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
