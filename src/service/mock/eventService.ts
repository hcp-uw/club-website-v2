import { IEvent } from '../../interfaces/IEvent';

// Mock data for events
export const mockEvents: IEvent[] = [
  {
    id: 1n,
    createdAt: new Date(),
    name: 'Mock Event 1',
    description: 'Mock description for Event 1',
    location: 'Mock Location 1',
    image: 'mock-event-1.jpg',
    startTime: new Date(),
    endTime: new Date(),
  },
  {
    id: 2n,
    createdAt: new Date(),
    name: 'Mock Event 2',
    description: 'Mock description for Event 2',
    location: 'Mock Location 2',
    image: 'mock-event-2.jpg',
    startTime: new Date(),
    endTime: new Date(),
  },
];

export const eventService = {
  getAllEvents: async (): Promise<IEvent[]> => {
    return mockEvents;
  },

  getEventById: async (id: bigint): Promise<IEvent | undefined> => {
    return mockEvents.find(event => event.id === id);
  },

  createEvent: async (event: Omit<IEvent, 'id' | 'createdAt'>): Promise<IEvent> => {
    const newEvent: IEvent = {
      id: BigInt(mockEvents.length + 1),
      createdAt: new Date(),
      ...event,
    };
    mockEvents.push(newEvent);
    return newEvent;
  },

  updateEvent: async (id: bigint, event: Partial<IEvent>): Promise<IEvent | undefined> => {
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents[index] = { ...mockEvents[index], ...event };
      return mockEvents[index];
    }
    return undefined;
  },

  deleteEvent: async (id: bigint): Promise<void> => {
    const index = mockEvents.findIndex(event => event.id === id);
    if (index !== -1) {
      mockEvents.splice(index, 1);
    }
  },
};
