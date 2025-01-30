import React from "react";
import { Bell, Calendar, Shield, Pill, ChevronRight } from "lucide-react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Your Health Companion
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Never Miss Your <span className="text-blue-600">Medicine</span>{" "}
              Again
            </h1>
            <p className="text-lg text-gray-600">
              Track, manage, and take your medications on time with our smart
              dosage tracker. Your health is our priority.
            </p>
            <div className="flex gap-4">
              <Link to="/home">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  Get Started
                </button>
              </Link>
              <button className="border border-gray-300 hover:border-blue-600 px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                Watch Demo <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80"
              alt="Medicine Tracking App"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive solution helps you manage your medications with
              ease and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bell className="w-8 h-8 text-blue-600" />,
                title: "Smart Reminders",
                description:
                  "Never miss a dose with customizable alerts and notifications",
              },
              {
                icon: <Calendar className="w-8 h-8 text-blue-600" />,
                title: "Schedule Management",
                description:
                  "Easily manage complex medication schedules and routines",
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Secure Records",
                description: "Keep your medical information safe and private",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition"
              >
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 50000, label: "Active Users", suffix: "+" },
              { number: 1000000, label: "Doses Tracked", suffix: "+" },
              { number: 99.9, label: "Uptime", suffix: "%" },
              { number: 24, label: "Support", suffix: "/7" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={5}
                    separator=","
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-16 text-center">
            <Pill className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of users who trust our app to manage their
              medications effectively.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default LandingPage;
