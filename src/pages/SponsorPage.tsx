import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Text, SimpleGrid, VStack, Heading, Spinner } from "@chakra-ui/react";
import { SponsorCard } from "../components/Sponsors/SponsorsCard";
import { sponsorService } from "../service/sponsorService";
import { ISponsor } from "../interfaces/ISponsor";

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
        setError("Failed to fetch sponsors");
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (loading)
    return (
      <Layout>
        <Spinner size="xl" />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <Text color="red.500">{error}</Text>
      </Layout>
    );

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Sponsors</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="40px">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.sponsorId.toString()} sponsor={sponsor} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};
