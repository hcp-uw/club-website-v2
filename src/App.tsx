import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { MembersPage } from './pages/MembersPage';
import { LeadTeamsPage } from './pages/LeadTeamsPage';
import { ProjectTeamsPage } from './pages/ProjectTeamsPage';
import { EventsPage } from './pages/EventsPage';
import { MemberDetailsPage } from './pages/MemberDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { JoinPage } from './pages/JoinPage';
import { SponsorPage } from './pages/SponsorPage';
import { OAPage } from './pages/OAPage';
import './App.css';
import Layout from './components/Layout';
import theme from './theme';
import LandingPage from './pages/LandingPage';

const Router = import.meta.env.VITE_USE_HASH_ROUTER ? HashRouter : BrowserRouter;

// Syncs hash links (e.g. `/#/oa`) seamlessly across both BrowserRouter & HashRouter modes
const RouteHashSync: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const targetPath = window.location.hash.substring(1);
      if (location.pathname !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <RouteHashSync />
        <Routes>
          {/* Secret OA Portal Route */}
          <Route path="/oa" element={<OAPage />} />

          {/* Standard Main Website Routes wrapped in Layout */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectTeamsPage /></Layout>} />
          <Route path="/events" element={<Layout><EventsPage /></Layout>} />
          <Route path="/members" element={<Layout><MembersPage /></Layout>} />
          <Route path="/members/:id" element={<Layout><MemberDetailsPage /></Layout>} />
          <Route path="/teams/leadership" element={<Layout><LeadTeamsPage /></Layout>} />
          <Route path="/join" element={<Layout><JoinPage /></Layout>} />
          <Route path="/sponsors" element={<Layout><SponsorPage /></Layout>} />

          {/* Fallback Catch-All Route */}
          <Route path="*" element={<Layout><LandingPage /></Layout>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
