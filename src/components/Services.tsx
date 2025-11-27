import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Palette, Code, Rocket, Smartphone } from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Creating intuitive and visually stunning user interfaces that captivate and engage your audience.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Building fast, scalable, and responsive web applications using cutting-edge technologies.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Apps",
      description: "Developing cross-platform mobile applications with native-like performance and feel.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Performance",
      description: "Optimizing applications for lightning-fast load times and smooth user experiences.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="services" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services <span className="text-gradient">Offered</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to bring your digital vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, isInView }: any) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-elegant hover:shadow-glow cursor-pointer"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      />
      
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6`}
      >
        {service.icon}
      </motion.div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{service.description}</p>

      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 border-2 border-primary/0 group-hover:border-primary/100 rounded-full transition-all duration-300"
        whileHover={{ scale: 1.2 }}
      />
    </motion.div>
  );
};

export default Services;
