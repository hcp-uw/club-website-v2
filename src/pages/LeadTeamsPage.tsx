import { SimpleGrid, Heading, VStack } from '@chakra-ui/react';
import { TeamLeadCard } from '../components/TeamLeadCard';
import { Layout } from '../components/Layout';
import { VALID_TEAMS } from '../interfaces/DBTypes';

export const LeadTeamsPage: React.FC = () => {
  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Leadership Teams</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {VALID_TEAMS.map((team, i) => (
            <TeamLeadCard key={i} team={team} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};
