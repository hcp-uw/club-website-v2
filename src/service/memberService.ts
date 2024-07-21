import axios from 'axios';
import { IMember } from '../interfaces/IMember';

const API_URL = 'http://localhost:7001';

export const memberService = {
  getAllMembers: async (): Promise<IMember[]> => {
    const response = await axios.get(`${API_URL}/members`);
    return response.data;
  },

  getMemberById: async (id: bigint): Promise<IMember> => {
    const response = await axios.get(`${API_URL}/members/${id}`);
    return response.data;
  },

  createMember: async (member: Omit<IMember, 'memberId' | 'createdAt'>): Promise<IMember> => {
    const response = await axios.post(`${API_URL}/members`, member);
    return response.data;
  },

  updateMember: async (id: bigint, member: Partial<IMember>): Promise<IMember> => {
    const response = await axios.put(`${API_URL}/members/${id}`, member);
    return response.data;
  },

  deleteMember: async (id: bigint): Promise<void> => {
    await axios.delete(`${API_URL}/members/${id}`);
  },
};