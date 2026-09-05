import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import i18n from './i18n';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import FarmerDashboard from './pages/FarmerDashboard';
import { FindMandi } from './pages/FindMandi';
import { MyBookings } from './pages/MyBookings';
import { TrackQueue } from './pages/TrackQueue';
import { Profile } from './pages/Profile';
import { HelpPage } from './pages/HelpPage';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('hi');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        language={language}
        setLanguage={setLanguage}
      />

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Main Dashboard - Existing page unchanged */}
          <Route path="/dashboard" element={<FarmerDashboard />} />
          
          {/* Placeholder pages with proper routing */}
          <Route path="/find-mandi" element={<FindMandi />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/track-queue" element={<TrackQueue />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Help page with helpline number */}
          <Route path="/help" element={<HelpPage />} />
          
          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// Expose i18n for global access
window._i18n = i18n;
window.__i18n_lng = 'hi';

console.log('MandiMitra v2.0 - Multilingual Edition Loaded');
