import React from "react";
import { ISponsor } from "../../interfaces/ISponsor";
import { Box, useColorModeValue, Text, Image, Link, Button } from "@chakra-ui/react";
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
        <Button
          as="a"
          href={sponsor.website}
          target="_blank"
          backgroundColor="purple.500"
          color="white"
          size="sm"
          rightIcon={<FiExternalLink color="white" />}
          _hover={{
            cursor: 'pointer',
          }}
          aria-label={`Link to ${sponsor.name} website`}
        >
          Website
        </Button>
      </Box>
    </Box>
  );
};
