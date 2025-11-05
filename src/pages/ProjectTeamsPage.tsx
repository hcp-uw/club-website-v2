import React, { useState, useEffect, useMemo } from "react";
import {
  SimpleGrid,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { teamService } from "../service/teamService";
// import FeaturedProjectsCarousel from "../components/FeaturedProjectsCarousel";
import { Helmet } from "react-helmet-async";
import { ProjectCard } from "../components/ProjectCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

type TeamData = { teamId: bigint; name: string; logo: string; projectYear?: number; description: string };

export const ProjectTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamService.getAllTeams();
        const validTeams = fetchedTeams.filter(
          (team) => team.teamId !== undefined
        ) as TeamData[];
        setTeams(validTeams);
        setFilteredTeams(validTeams);
      } catch (err) {
        setError('Failed to fetch project teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  const teamsByYear = useMemo(() => {
    const map = new Map<number, TeamData[]>();
    filteredTeams.forEach((team) => {
      const year = team.projectYear ?? 0;
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(team);
    });

    // Sort teams within year alphabetically
    for (const [, list] of map) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return map;
  }, [filteredTeams]);

  // const showcaseHeaderStyle = {
  //   bgGradient: "linear(to-r, purple.500, blue.400)", // Remove this to disable gradient
  //   color: "white",
  //   px: 4,
  //   py: 2,
  //   borderRadius: "md",
  //   width: "fit-content",
  // };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <VStack spacing={8} align="stretch">
      <Helmet>
        <title>Projects</title>
        <meta
          name="description"
          content="Explore the innovative project teams at Husky Coding Project. Discover how our talented developers, designers, and engineers collaborate to build real-world software solutions, drive technical innovation, and create impact at the University of Washington and beyond."
        />
      </Helmet>

      <Heading>Projects</Heading>
      {/* <FeaturedProjectsCarousel /> */}

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      {Array.from(teamsByYear.keys())
        .sort((a, b) => b - a) // newest year first
        .map((year) => (
          <React.Fragment key={year}>
            <Heading size="lg" mt="6">
              {year === 0 ? "Other Projects" : year}
            </Heading>

            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {teamsByYear.get(year)!.map((team) => (
                <ProjectCard key={team.teamId.toString()} project={team} />
              ))}
            </SimpleGrid>
          </React.Fragment>
        ))}
    </VStack >
  );
};
