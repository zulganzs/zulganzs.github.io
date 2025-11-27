import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Users, Coffee, Smile } from "lucide-react";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: <Award className="w-8 h-8" />, value: 150, label: "Projects Completed", suffix: "+" },
    { icon: <Users className="w-8 h-8" />, value: 80, label: "Happy Clients", suffix: "+" },
    { icon: <Coffee className="w-8 h-8" />, value: 2000, label: "Cups of Coffee", suffix: "+" },
    { icon: <Smile className="w-8 h-8" />, value: 100, label: "Satisfaction Rate", suffix: "%" },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, isInView }: any) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="inline-flex p-4 bg-primary/10 rounded-2xl text-primary mb-4 group-hover:shadow-glow"
      >
        {stat.icon}
      </motion.div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
        className="text-4xl md:text-5xl font-bold mb-2 text-gradient"
      >
        {displayValue}{stat.suffix}
      </motion.div>
      
      <p className="text-muted-foreground font-medium">{stat.label}</p>
    </motion.div>
  );
};

export default Stats;
