import axios from 'axios'
import { ITeam, ITeamMemberRelation } from '../interfaces/ITeam'
import { IMember } from '../interfaces/IMember'

const API_URL = 'your-api-url'

export const teamService = {
  getAllTeams: async (): Promise<ITeam[]> => {
    const response = await axios.get(`${API_URL}/teams`)
    return response.data
  },

  getTeamById: async (id: bigint): Promise<ITeam> => {
    const response = await axios.get(`${API_URL}/teams/${id}`)
    return response.data
  },

  createTeam: async (
    team: Omit<ITeam, 'teamId' | 'createdAt'>
  ): Promise<ITeam> => {
    const response = await axios.post(`${API_URL}/teams`, team)
    return response.data
  },

  updateTeam: async (id: bigint, team: Partial<ITeam>): Promise<ITeam> => {
    const response = await axios.put(`${API_URL}/teams/${id}`, team)
    return response.data
  },

  deleteTeam: async (id: bigint): Promise<void> => {
    await axios.delete(`${API_URL}/teams/${id}`)
  },

  getTeamMembers: async (teamId: bigint): Promise<ITeamMemberRelation[]> => {
    const response = await axios.get(`${API_URL}/teams/${teamId}/members`)
    return response.data
  },

  addTeamMember: async (
    teamId: bigint,
    memberId: bigint
  ): Promise<ITeamMemberRelation> => {
    const response = await axios.post(`${API_URL}/teams/${teamId}/members`, {
      memberId
    })
    return response.data
  },

  removeTeamMember: async (teamId: bigint, memberId: bigint): Promise<void> => {
    await axios.delete(`${API_URL}/teams/${teamId}/members/${memberId}`)
  },

  getMemberById: async (id: bigint): Promise<IMember> => {
    const response = await axios.get(`${API_URL}/members/${id}`)
    return response.data
  }
}
