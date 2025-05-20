import React, { useEffect, useState } from 'react';
import { Text, SimpleGrid, VStack, Heading, Spinner } from '@chakra-ui/react';
import { SponsorCard } from '../components/Sponsors/SponsorsCard';
import { sponsorService } from '../service/sponsorService';
import { ISponsor } from '../interfaces/ISponsor';
import { Helmet } from 'react-helmet-async';

export const SponsorPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<ISponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await sponsorService.getAllSponsors();
        setSponsors(data);
      } catch (err) {
        setError('Failed to fetch sponsors');
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
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
        <title>Sponsors</title>
        <meta
          name="description"
          content="Meet the sponsors who support Husky Coding Project’s mission to empower student developers and innovators. Learn how our sponsors help drive technical education, community projects, and career growth at the University of Washington."
        />
      </Helmet>

      <Heading>Sponsors</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="40px">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.sponsorId.toString()} sponsor={sponsor} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
