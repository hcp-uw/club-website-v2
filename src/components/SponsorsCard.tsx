import React from "react";
import { ISponsor } from "../interfaces/ISponsor";
import { Box, useColorModeValue, Text, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface SponsorsCardProps {
  sponsor: ISponsor;
}

export const SponsorCard: React.FC<SponsorsCardProps> = ({ sponsor }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  return (
    <Box
      as={RouterLink}
      to={sponsor.sponsorLink}
      target="_blank"
      rel="noopener noreferrer"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
      bg={bgColor}
      borderColor={borderColor}
      textDecoration="none"
    >
      <Box>
        <Image
          src={`/images/${sponsor.sponsorLogo}`}
          alt={sponsor.sponsorName}
          borderRadius="md"
          // boxSize="100px"
        />
      </Box>
      <Box mt={4}>
        <Text fontWeight="bold" fontSize="xl">
          {sponsor.sponsorName}
        </Text>
        <Text mt={2}>{sponsor.sponsorDescription}</Text>
      </Box>
    </Box>
  );
};
