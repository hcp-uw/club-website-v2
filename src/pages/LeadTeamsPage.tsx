import { SimpleGrid, Heading, VStack } from '@chakra-ui/react';
import { TeamLeadCard } from '../components/TeamLeadCard';
import { Layout } from '../components/Layout';
import { VALID_TEAMS } from '../interfaces/DBTypes';
import { Helmet } from 'react-helmet-async';

export const LeadTeamsPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Leadership</title>
        <meta
          name="description"
          content="Meet the leadership teams of Husky Coding Project. Learn about our dedicated team leads and their roles in guiding our community."
        />
      </Helmet>
      <VStack spacing={8} align="stretch">
        <Heading>Leadership</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {VALID_TEAMS.map((team, i) => (
            <TeamLeadCard key={i} team={team} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};
