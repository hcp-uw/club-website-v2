import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Text, SimpleGrid, VStack, Heading } from "@chakra-ui/react";
import { SponsorCard } from "../components/Sponsors/SponsorsCard";
import { sponsorService } from "../service/mock/sponsorService";
import { ISponsor } from "../interfaces/ISponsor";

export const SponsorPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<ISponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const data = await sponsorService.getAllSponsors();
      setSponsors(data);
    };
    fetchSponsors();
  }, []);

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Our Sponsors</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="40px">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.sponsorId.toString()} sponsor={sponsor} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};
