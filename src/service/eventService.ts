import { IEvent } from '../interfaces/IEvent';
import { supabase } from './client';
import { DBEvent } from '../interfaces/DBTypes';
import { mapDBEventToIEvent } from '../interfaces/mapping';

export const eventService = {
  getAllEvents: async (): Promise<IEvent[]> => {
    let { data, error } = await supabase
      .from('Events')
      .select('*')
    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    return data.map(mapDBEventToIEvent);
  },

  getEventById: async (id: bigint): Promise<IEvent> => {
    const { data, error } = await supabase
      .from('Events')
      .select('*')
      .eq('id', id)
      .returns<DBEvent>()
      .single();


    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Event not found');
    }

    return mapDBEventToIEvent(data);
  },

  createEvent: async (event: Omit<IEvent, 'id' | 'createdAt'>): Promise<IEvent> => {
    throw new Error('Not implemented');
  },

  updateEvent: async (id: bigint, event: Partial<IEvent>): Promise<IEvent> => {
    throw new Error('Not implemented');
  },

  deleteEvent: async (id: bigint): Promise<void> => {
    throw new Error('Not implemented');
  },
};