import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const founders = [
  {
    name: "Mr.Sai Charan Suggala",
    role: "CEO & Co-founder",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    bio: "With over 15 years of experience in healthcare management, Dr. Johnson leads our mission to revolutionize healthcare accessibility."
  },
  {
    name: "Mr.Yerram pranay",
    role: "CTO & Co-founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    bio: "A tech innovator with a passion for healthcare, Michael ensures our platform delivers the best possible user experience."
  },
  {
    name: "Mr.KSR Neeraj",
    role: "Medical Director & Co-founder",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    bio: "Dr. Rodriguez brings her extensive medical expertise to ensure all our products meet the highest medical standards."
  }
];

export function Founder() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Founders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our leadership team brings together expertise in healthcare, technology,
            and business to deliver the best possible healthcare solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative mb-4 group">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{founder.name}</h3>
              <p className="text-blue-600 mb-3">{founder.role}</p>
              <p className="text-gray-600">{founder.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Founder;