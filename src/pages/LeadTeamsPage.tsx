import { SimpleGrid, Heading, VStack, Spinner, Text } from '@chakra-ui/react';
import { TeamLeadCard } from '../components/TeamLeadCard';
import { useEffect, useState } from 'react';
import { teamService } from '../service/teamService';
import { ITeam } from '../interfaces/ITeam';
import { Helmet } from 'react-helmet-async';

export const LeadTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const leadershipTeams = teams
    .filter((team) => team.lead)
    .sort((a, b) => Number(a.teamId - b.teamId));

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamService.getAllTeams(true);
        setTeams(fetchedTeams);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading)
    return (
      <VStack flex="1" justify="center" align="center">
        <Spinner size="xl" />
      </VStack>
    );
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={8} align="stretch">
      <Helmet>
        <title>Leadership</title>
        <meta
          name="description"
          content="Meet the leadership teams of Husky Coding Project. Learn about our dedicated team leads and their roles in guiding our community."
        />
      </Helmet>
      <Heading>Leadership</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {leadershipTeams.map((team) => (
          <TeamLeadCard key={team.name} team={team} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
