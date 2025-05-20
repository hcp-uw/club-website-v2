import React, { useEffect, useState } from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { SponsorCard } from '../components/Sponsors/SponsorsCard';
import { sponsorService } from '../service/sponsorService';
import { ISponsor } from '../interfaces/ISponsor';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import Error from '../components/Error';

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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

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
