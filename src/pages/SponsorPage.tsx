import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Text, SimpleGrid } from "@chakra-ui/react";
import { SponsorCard } from "../components/SponsorsCard";
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
      <Text
        fontSize={["2xl", "3xl", "4xl", "5xl"]}
        fontWeight="semibold"
        marginTop="1em"
      >
        Our Sponsors
      </Text>
      <SimpleGrid columns={2} gap="40px">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.sponsorId.toString()} sponsor={sponsor} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};
