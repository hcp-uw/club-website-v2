import { ChakraProvider, theme } from "@chakra-ui/react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { MembersPage } from "./pages/MembersPage";
import { TeamsPage } from "./pages/TeamsPage";
import { EventsPage } from "./pages/EventsPage";
import { MemberDetailsPage } from "./pages/MemberDetailsPage";
import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { JoinPage } from "./pages/JoinPage";
import { SponsorPage } from "./pages/SponsorPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/sponsors" element={<SponsorPage />} />
          <Route path="/" element={<AboutPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
