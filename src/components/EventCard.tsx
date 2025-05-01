import React from 'react';
import {
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Icon,
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
  const headerColor = useColorModeValue('gray.700', 'gray.200');
  const descriptionColor = useColorModeValue('gray.600', 'gray.300');
  const footerColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      bg={bgColor}
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
          <EventDate date={new Date(event.startTime)} />
          <Heading size="md" noOfLines={2} color={headerColor} lineHeight="1.4">
            {event.name}
          </Heading>
        </HStack>
        {/* Event Description */}
        <Text color={descriptionColor} whiteSpace="pre-line">
          {event.description}
        </Text>
        {/* Card Footer */}
        <VStack marginTop="auto" width="100%" align="start" spacing="3">
          {event.linkURL && event.linkTitle && (
            <Button
              as="a"
              href={event.linkURL}
              target="_blank"
              backgroundColor="purple.500"
              color="white"
              size="sm"
              rightIcon={<FiExternalLink color="white" />}
              _hover={{
                cursor: 'pointer',
              }}
            >
              {event.linkTitle}
            </Button>
          )}
          <HStack spacing="4">
            <HStack>
              <Icon as={FaMapMarkerAlt} color={footerColor} />
              <Text fontSize="sm" color={footerColor} noOfLines={1}>
                {event.location}
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaRegClock} color={footerColor} />
              <Text fontSize="sm" color={footerColor} whiteSpace="nowrap">
                {getTimeString(event.startTime, event.endTime)}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
