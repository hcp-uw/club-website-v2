import { ITeam, ITeamMemberRelation } from '../../interfaces/ITeam';
import { IMember } from '../../interfaces/IMember';
import { mockMembers } from './memberService';

// Mock data for teams
export const mockTeams: ITeam[] = [
  {
    teamId: 1n,
    name: 'Team A',
    createdAt: new Date(),
    logo: 'team-a-logo.jpg',
    deployLink: 'https://team-a-deploy.example.com',
  },
  {
    teamId: 2n,
    name: 'Team B',
    createdAt: new Date(),
    logo: 'https://wivolixjgzmaigovvchs.supabase.co/storage/v1/object/public/club-website-assets/elijah-profile.png?t=2024-07-21T09%3A58%3A03.289Z',
    deployLink: 'https://team-b-deploy.example.com',
  },
];

// Mock data for team-member relations
const mockTeamMemberRelations: ITeamMemberRelation[] = [
  {
    id: 1n,
    createdAt: new Date(),
    teamId: 1n,
    memberId: 1n,
  },
  {
    id: 2n,
    createdAt: new Date(),
    teamId: 2n,
    memberId: 2n,
  },
];

export const teamService = {
  getAllTeams: async (): Promise<ITeam[]> => {
    return mockTeams;
  },

  getTeamById: async (id: bigint): Promise<ITeam | undefined> => {
    return mockTeams.find(team => team.teamId === id);
  },

  createTeam: async (team: Omit<ITeam, 'teamId' | 'createdAt'>): Promise<ITeam> => {
    const newTeam: ITeam = {
      teamId: BigInt(mockTeams.length + 1),
      createdAt: new Date(),
      ...team,
    };
    mockTeams.push(newTeam);
    return newTeam;
  },

  updateTeam: async (id: bigint, team: Partial<ITeam>): Promise<ITeam | undefined> => {
    const index = mockTeams.findIndex(t => t.teamId === id);
    if (index !== -1) {
      mockTeams[index] = { ...mockTeams[index], ...team };
      return mockTeams[index];
    }
    return undefined;
  },

  deleteTeam: async (id: bigint): Promise<void> => {
    const index = mockTeams.findIndex(team => team.teamId === id);
    if (index !== -1) {
      mockTeams.splice(index, 1);
    }
  },

  getTeamMembers: async (teamId: bigint): Promise<ITeamMemberRelation[]> => {
    return mockTeamMemberRelations.filter(relation => relation.teamId === teamId);
  },

  addTeamMember: async (teamId: bigint, memberId: bigint): Promise<ITeamMemberRelation> => {
    const newRelation: ITeamMemberRelation = {
      id: BigInt(mockTeamMemberRelations.length + 1),
      createdAt: new Date(),
      teamId,
      memberId,
    };
    mockTeamMemberRelations.push(newRelation);
    return newRelation;
  },

  removeTeamMember: async (teamId: bigint, memberId: bigint): Promise<void> => {
    const index = mockTeamMemberRelations.findIndex(relation => relation.teamId === teamId && relation.memberId === memberId);
    if (index !== -1) {
      mockTeamMemberRelations.splice(index, 1);
    }
  },

  getMemberById: async (id: bigint): Promise<IMember | undefined> => {
    return mockMembers.find(member => member.memberId === id);
  },
};
