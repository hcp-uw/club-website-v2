import { IMember } from '../interfaces/IMember';
import { supabase } from './client';
import { DBMember, Team} from '../interfaces/DBTypes';
import { mapDBMemberToIMember } from '../interfaces/mapping';


export const memberService = {
  getAllMembers: async (): Promise<IMember[]> => {
    const { data, error } = await supabase
      .from('Members')
      .select('*')
      .returns<DBMember[]>();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    return data.map(mapDBMemberToIMember);
  },

  getMemberById: async (id: bigint): Promise<IMember> => {
    const { data, error } = await supabase
      .from('Members')
      .select('*')
      .eq('memberId', Number(id))
      .returns<DBMember>()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Member not found');
    }

    return mapDBMemberToIMember(data);
  },

  createMember: async (_member: Omit<IMember, 'memberId' | 'createdAt'>): Promise<IMember> => {
    throw new Error('Not implemented');
  },

  updateMember: async (_id: bigint, _member: Partial<IMember>): Promise<IMember> => {
    throw new Error('Not implemented');
  },

  deleteMember: async (_id: bigint): Promise<void> => {
    throw new Error('Not implemented');
  },

  getAllLeads: async (): Promise<IMember[]> => {
    const { data, error } = await supabase
    .from('Members')
    .select('*')
    .eq('lead', true)
    .returns<DBMember[]>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data.map(mapDBMemberToIMember);
  },

  getMembersbyTeam: async (teamlead: Team): Promise<IMember[]> => {
    const { data, error } = await supabase
    .from('Members')
    .select('*')
    .eq('teamleads', teamlead)
    .returns<DBMember[]>()

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Member not found');
  }

  return data.map(mapDBMemberToIMember);
},



};