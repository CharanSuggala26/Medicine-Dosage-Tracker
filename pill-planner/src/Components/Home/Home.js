import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medicine Dose Tracker</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-transparent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggle}>
              {active ? 'Close' : 'Menu'}
            </button>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
          </div>
        </div>
      </nav>

      {active && (
        <div className="bg-blue-500 text-white py-2">
          <div className="container mx-auto flex justify-between items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-blue-700">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-700">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <main className="flex-1">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Medicine Dose Tracker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300">
              <h3 className="text-lg font-bold mb-2">Medicine 1</h3>
              <p className="text-gray-600 mb-4">Description of medicine 1</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300">
              <h3 className="text-lg font-bold mb-2">Medicine 2</h3>
              <p className="text-gray-600 mb-4">Description of medicine 2</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300">
              <h3 className="text-lg font-bold mb-2">Medicine 3</h3>
              <p className="text-gray-600 mb-4">Description of medicine 3</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-lg font-bold mb-2">Medicine Dose Tracker</p>
          <p className="text-gray-600">Copyright 2023</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;