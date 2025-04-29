import React from 'react';
import {
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { IEvent } from '../interfaces/IEvent';
import EventDate from './EventDate';
import { FiExternalLink } from 'react-icons/fi';

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
      {/* Event Image */}
      <Image
        src={event.image}
        alt={event.name}
        objectFit="cover"
        height="36"
        width="100%"
      />
      <VStack
        align="start"
        spacing="3"
        p="5"
        paddingTop="4"
        width="100%"
        height="100%"
      >
        {/* Event Title and Date */}
        <HStack spacing="5" height="3em">
          <EventDate date={new Date(event.start_time)} />
          <Heading size="md" noOfLines={2} color="gray.700" lineHeight="1.4">
            {event.name}
          </Heading>
        </HStack>
        {/* Event Description */}
        <Text color="gray.600" whiteSpace="pre-line">
          {event.description}
        </Text>
        {/* Card Footer */}
        <VStack marginTop="auto" width="100%" align="start" spacing="3">
          {event.link_url && event.link_title && (
            <Button
              as="a"
              href={event.link_url}
              target="_blank"
              colorScheme="purple"
              size="sm"
              rightIcon={<FiExternalLink color="white" />}
              _hover={{
                cursor: 'pointer',
              }}
            >
              {event.link_title}
            </Button>
          )}
          <HStack spacing="4">
            <HStack>
              <FaMapMarkerAlt color="gray" />
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {event.location}
              </Text>
            </HStack>
            <HStack>
              <FaRegClock color="gray" />
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                {getTimeString(event.start_time, event.end_time)}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
