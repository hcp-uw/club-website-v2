import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { EventCard } from '../components/EventCard';
import { eventService } from '../service/eventService';
import { IEvent } from '../interfaces/IEvent';
import { Helmet } from 'react-helmet-async';
import Error from '../components/Error';
import Loading from '../components/Loading';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await eventService.getAllEvents();
        fetchedEvents.sort((a, b) => {
          return (
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );
        });
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <VStack spacing={8} align="stretch">
      <Helmet>
        <title>Events</title>
        <meta
          name="description"
          content="Stay updated on upcoming and past events hosted by Husky Coding Project. Join workshops, hackathons, info sessions, and networking opportunities designed to empower student developers and foster a thriving tech community at the University of Washington."
        />
      </Helmet>
      <Heading>Events</Heading>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <VStack align="start" gap="5">
        <Heading size="lg">Upcoming Events</Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}
          width="100%"
          placeItems="center"
        >
          {filteredEvents
            .filter((event) => new Date() <= new Date(event.endTime))
            .map((event) => (
              <EventCard key={event.id?.toString()} event={event} />
            ))}
        </SimpleGrid>
      </VStack>
      <VStack align="start" gap="5">
        <Heading size="lg">Past Events</Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}
          width="100%"
          placeItems="center"
        >
          {filteredEvents
            .filter((event) => new Date() > new Date(event.endTime))
            .reverse()
            .map((event) => (
              <EventCard key={event.id?.toString()} event={event} />
            ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};
