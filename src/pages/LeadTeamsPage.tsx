import React, { useState, useEffect } from 'react';
import { SimpleGrid, Heading, Spinner, Text, VStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { TeamCard } from '../components/TeamCard';
import { teamService } from '../service/teamService';
import { ITeam } from '../interfaces/ITeam';
import { Layout } from '../components/Layout';

export const LeadTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamService.getAllTeams();
        setTeams(fetchedTeams);
        setFilteredTeams(fetchedTeams);
      } catch (err) {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter(team =>
      team.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  if (loading) return <Layout><Spinner size="xl" /></Layout>;
  if (error) return <Layout><Text color="red.500">{error}</Text></Layout>;

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Teams</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {filteredTeams.map(team => (
            <TeamCard key={team.teamId?.toString()} team={team} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};