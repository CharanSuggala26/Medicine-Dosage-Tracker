import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Store from './Pages/Store';
import About from './Pages/About';
import Shceduling from './Pages/Shceduling';
import Login from './Pages/Login';
import Appointment from './Pages/Appointment';
import Contact from './Pages/Contact';
import Signup from './Pages/Signup';
import AdminPortal from './Pages/AdminPortal';
import AdminDoctor from './Pages/AdminDoctor';
import AdminMedicines from './Pages/AdminMedicines';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<Store />} />
            <Route path="/shceduling" element={<Shceduling />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<AdminPortal />} />
            <Route path="/doctor" element={<AdminDoctor />} />
            <Route path="/medicines" element={<AdminMedicines />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;