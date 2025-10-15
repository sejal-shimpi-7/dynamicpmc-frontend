import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Your Existing Components
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import OurProject from './Components/OurProject/OurProject';
import Footer from './Components/Footer/Footer';
import ContactUs from './Components/ContactUs/ContactUs';
import Consultancy from './Components/OurProject/Consultancy/Consultancy';
import Architecture from "./Components/OurProject/Architecture/Architecture";
import Interior from './Components/OurProject/Interior/Interior';
import OurServices from './Components/OurServices/OurServices';
import WeDeliver from './Components/WeDeliver/WeDeliver';

// Admin Functionality Components
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Components/LoginPage/LoginPage';
import AdminPage from './Components/AdminPage/AdminPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AdminLayout from './Components/AdminLayout/AdminLayout'; // <-- 1. IMPORT THE NEW LAYOUT

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            
            {/* --- YOUR EXISTING PUBLIC ROUTES --- */}
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <OurServices/>
                <WeDeliver/>
                <OurProject />
              </>
            } />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/interior" element={<Interior />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* --- ADMIN ROUTES --- */}
            <Route path="/login" element={<LoginPage />} />

            {/* THIS IS THE IMPORTANT CHANGE */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* All routes inside here are protected AND will auto-logout */}
              <Route index element={<AdminPage />} /> 
              {/* You can add more admin pages here later, e.g.: */}
              {/* <Route path="settings" element={<AdminSettings />} /> */}
            </Route>

          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;