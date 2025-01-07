import axios from 'axios';
import { ISponsor } from '../interfaces/ISponsor';

const API_URL = 'http://localhost:7001';

export const memberService = {
  getAllMembers: async (): Promise<ISponsor[]> => {
    const response = await axios.get(`${API_URL}/members`);
    return response.data;
  },

  getMemberById: async (id: bigint): Promise<ISponsor> => {
    const response = await axios.get(`${API_URL}/members/${id}`);
    return response.data;
  },

  createMember: async (member: Omit<ISponsor, 'memberId' | 'createdAt'>): Promise<ISponsor> => {
    const response = await axios.post(`${API_URL}/members`, member);
    return response.data;
  },

  updateMember: async (id: bigint, member: Partial<ISponsor>): Promise<ISponsor> => {
    const response = await axios.put(`${API_URL}/members/${id}`, member);
    return response.data;
  },

  deleteMember: async (id: bigint): Promise<void> => {
    await axios.delete(`${API_URL}/members/${id}`);
  },
};