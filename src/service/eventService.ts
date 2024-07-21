import axios from 'axios';
import { IEvent } from '../interfaces/IEvent';

const API_URL = 'your-api-url';

export const eventService = {
  getAllEvents: async (): Promise<IEvent[]> => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  },

  getEventById: async (id: bigint): Promise<IEvent> => {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  },

  createEvent: async (event: Omit<IEvent, 'id' | 'createdAt'>): Promise<IEvent> => {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  },

  updateEvent: async (id: bigint, event: Partial<IEvent>): Promise<IEvent> => {
    const response = await axios.put(`${API_URL}/events/${id}`, event);
    return response.data;
  },

  deleteEvent: async (id: bigint): Promise<void> => {
    await axios.delete(`${API_URL}/events/${id}`);
  },
};