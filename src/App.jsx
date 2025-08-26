import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import PracticeLab from './pages/PracticeLab';
import BiharPride from './pages/BiharPride';
import DownloadCenter from './pages/DownloadCenter';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Sports from './pages/MentorshipSports';
import Career from './pages/CareerGuidance';
import ChatBotPage from './pages/ChatBotPage';
import TuteVideo from './pages/TuteVideo';
import Events from './pages/Tournaments';
// LandingPage.jsx
 function LandingPage() {
  return (
    <>
      <Home />
      <Sports/>
      <Career/>
    </>
  );
}


export default function App() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:classId" element={<CourseDetail />} />
        <Route path="/practice-lab" element={<PracticeLab />} />
        <Route path="/bihar-pride" element={<BiharPride />} />
        <Route path="/download-center" element={<DownloadCenter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<ChatBotPage />} />
        <Route path="/tuteVideo" element={<TuteVideo />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      <Footer />
      {/* Add Footer and mobile navigation if desired */}
    </Router>
    </div>
  );
}
