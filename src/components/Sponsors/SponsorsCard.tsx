import React from "react";
import { ISponsor } from "../../interfaces/ISponsor";
import { Box, useColorModeValue, Text, Image, Link } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

interface SponsorsCardProps {
  sponsor: ISponsor;
}

export const SponsorCard: React.FC<SponsorsCardProps> = ({ sponsor }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      as={RouterLink}
      to={sponsor.website}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
      bg={bgColor}
      borderColor={borderColor}
      target="_blank"
    >
      <Box>
        <Image src={sponsor.logo} alt={sponsor.name} borderRadius="md" />
      </Box>
      <Box mt={6}>
        <Text fontWeight="bold" fontSize="xl">
          {sponsor.name}
        </Text>
        <Text mt={2}>{sponsor.description}</Text>
      </Box>
      <Box mt={2}>
        <Link
          href={sponsor.website}
          isExternal
          rel="noopener noreferrer"
          color="blue.500"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
        >
          Website <FiExternalLink style={{ marginLeft: "4px" }} />
        </Link>
      </Box>
    </Box>
  );
};
