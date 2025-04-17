import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IEvent } from '../interfaces/IEvent';
import EventDate from './EventDate';

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
      height="400px"
    >
      <Image
        src={event.image}
        alt={event.name}
        objectFit="cover"
        height="40%"
        width="100%"
      />
      <Box p="6" height="60%">
        <VStack align="start" spacing="3" height="100%">
          <HStack spacing="5">
            <EventDate date={new Date(event.start_time)} />
            <Heading size="md" noOfLines={2} color="gray.700" lineHeight="1.4">
              {event.name}
            </Heading>
          </HStack>
          <Text noOfLines={4} color="gray.600" whiteSpace="pre-line">
            {event.description}
          </Text>
          <HStack spacing="4" marginTop="auto">
            <HStack>
              <FaMapMarkerAlt color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {event.location}
              </Text>
            </HStack>
            <HStack>
              <TimeIcon color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {new Date(event.start_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
