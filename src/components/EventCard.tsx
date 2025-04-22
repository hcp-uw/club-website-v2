import React from 'react';
import { Box, Image, Heading, Text, Button, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IEvent } from '../interfaces/IEvent';

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      bg={bgColor}
      borderColor={borderColor}
    >
      <Image src={event.image} alt={event.name} objectFit="cover" height="200px" width="100%" />
      <Box p={6}>
        <VStack align="start" spacing={3}>
          <Heading size="md">{event.name}</Heading>
          <Text noOfLines={2} color="gray.600">{event.description}</Text>
          <HStack spacing={4}>
            <HStack>
              <FaMapMarkerAlt color="gray.500" />
              <Text fontSize="sm" color="gray.500">{event.location}</Text>
            </HStack>
            <HStack>
              <CalendarIcon color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {event.createdAt && new Date(event.createdAt).toLocaleDateString()}
              </Text>
            </HStack>
          </HStack>
          <Button as="a" href={event.rsvpLink} target="_blank" colorScheme="teal" size="sm" width="full">
            RSVP
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};