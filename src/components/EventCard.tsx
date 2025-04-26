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
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { IEvent } from '../interfaces/IEvent';
import EventDate from './EventDate';

interface EventCardProps {
  event: IEvent;
}

const formatTime = (date: Date, showAMPM: boolean = true) => {
  const time = date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
    .replace(' ', '');

  return showAMPM ? time : time.replace(/AM|PM/, '');
};

const getTimeString = (startTime: Date, endTime: Date) => {
  const sameAMPM = startTime.getHours() < 12 === endTime.getHours() < 12;

  return `${formatTime(startTime, !sameAMPM)}-${formatTime(endTime)}`;
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      bg={bgColor}
      borderColor={borderColor}
      width={{ base: 'sm', md: '100%' }}
      maxWidth="100%" // for mobile
      height="100%"
      minHeight="sm"
      gap="0"
    >
      <Image
        src={event.image}
        alt={event.name}
        objectFit="cover"
        height="36"
        width="100%"
      />
      <Box p="5" paddingTop="4" flex="1" width="100%">
        <VStack align="start" spacing="2" height="100%">
          <HStack spacing="5">
            <EventDate date={new Date(event.start_time)} />
            <Heading
              size="md"
              noOfLines={2}
              color="gray.700"
              lineHeight="1.4"
              height="2.8em"
              display="flex"
              alignItems="center"
            >
              {event.name}
            </Heading>
          </HStack>
          <Text color="gray.600" whiteSpace="pre-line">
            {event.description}
          </Text>
          <HStack spacing="4" marginTop="auto">
            <HStack>
              <FaMapMarkerAlt color="gray" />
              <Text fontSize="sm" color="gray.500">
                {event.location}
              </Text>
            </HStack>
            <HStack>
              <FaRegClock color="gray" />
              <Text fontSize="sm" color="gray.500">
                {getTimeString(event.start_time, event.end_time)}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};
