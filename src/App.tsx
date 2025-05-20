import { ChakraProvider, theme } from '@chakra-ui/react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { MembersPage } from './pages/MembersPage';
import { LeadTeamsPage } from './pages/LeadTeamsPage';
import { ProjectTeamsPage } from './pages/ProjectTeamsPage';
import { EventsPage } from './pages/EventsPage';
import { MemberDetailsPage } from './pages/MemberDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { JoinPage } from './pages/JoinPage';
import { SponsorPage } from './pages/SponsorPage';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/members" element={<MembersPage />} />
            <Route path="/members/:id" element={<MemberDetailsPage />} />
            <Route path="/teams/leadership" element={<LeadTeamsPage />} />
            <Route path="/teams/members" element={<ProjectTeamsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/sponsors" element={<SponsorPage />} />
            <Route path="/" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
