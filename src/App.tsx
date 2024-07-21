import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MembersPage } from './pages/MembersPage';
import { TeamsPage } from './pages/TeamsPage';
import { EventsPage } from './pages/EventsPage';
import { MemberDetailsPage } from './pages/MemberDetailsPage';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/" element={<MembersPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;