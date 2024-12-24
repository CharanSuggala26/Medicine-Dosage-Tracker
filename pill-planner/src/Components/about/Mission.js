import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Shield, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Quality Care",
    description: "We ensure all our products meet the highest quality standards."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your health and safety are our top priorities."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do."
  }
];

export function Mission() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We strive to make healthcare accessible to everyone through innovative
            solutions and exceptional service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <value.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mission;