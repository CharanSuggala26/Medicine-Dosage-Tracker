import React from 'react';
import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <img
        src="https://www.healthcaremea.com/wp-content/uploads/2022/07/Medical-tourism.jpg"
        alt="Medical background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Caring for Your Health, Every Step of the Way
          </h1>
          <p className="text-lg text-gray-200">
            At Pill-Planner, we're committed to providing accessible healthcare solutions
            with a focus on quality, affordability, and customer care.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutHero;