import React from 'react';
import { AboutHero } from '../Components/about/AboutHero';
import { Mission } from '../Components/about/Mission';
import { Founder } from '../Components/about/Founder';
import { Testimonials } from '../Components/about/Testimonials';

export function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <Mission />
      <Founder />
      <Testimonials />
    </div>
  );
}

export default About;