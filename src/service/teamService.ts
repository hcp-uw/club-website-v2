import { supabase } from './client'
import { DBMember, DBTeam, DBTeamMemberRelation } from '../interfaces/DBTypes'
import { ITeam, ITeamMemberRelation } from '../interfaces/ITeam'
import { IMember } from '../interfaces/IMember'
import { mapDBTeamToITeam, mapDBTeamMemberRelationToITeamMemberRelation, mapDBMemberToIMember } from '../interfaces/mapping'

const API_URL = 'your-api-url'

export const teamService = {
  getAllTeams: async (): Promise<ITeam[]> => {
    let { data: teamData, error: teamError } = await supabase
      .from('Teams')
      .select('*')
      .returns<DBTeam[]>()

    if (teamError) {
      throw new Error(teamError.message)
    }

    if (!teamData) {
      return []
    }

    return teamData.map(mapDBTeamToITeam);
  },

  getTeamById: async (id: bigint): Promise<ITeam> => {
    let { data: teamData, error: teamError } = await supabase
      .from('Teams')
      .select('*')
      .eq('teamId', id)
      .returns<DBTeam>()
      .single()

    if (teamError) {
      throw new Error(teamError.message)
    }

    if (!teamData) {
      throw new Error('Team not found')
    }

    return mapDBTeamToITeam(teamData)
  },

  createTeam: async (
    _team: Omit<ITeam, 'teamId' | 'createdAt'>
  ): Promise<ITeam> => {
    throw new Error('Not implemented')
  },

  updateTeam: async (_id: bigint, _team: Partial<ITeam>): Promise<ITeam> => {
    throw new Error('Not implemented')
  },

  deleteTeam: async (_id: bigint): Promise<void> => {
    throw new Error('Not implemented')
  },

  getTeamMembers: async (teamId: bigint): Promise<IMember[]> => {
    const id: number = Number(teamId)
    let { data: teamMemberData, error: teamMemberError } = await supabase
      .from('TeamMemberRelation')
      .select('*')
      .eq('teamId', id)
      .returns<DBTeamMemberRelation[]>()

    if (teamMemberError) {
      throw new Error(teamMemberError.message)
    }

    if (!teamMemberData) {
      return []
    }

    const ids = teamMemberData.map((relation) => relation.memberId)
    let { data: memberData, error: memberError } = await supabase
      .from('Members')
      .select('*')
      .in('memberId', ids)
      .returns<DBMember[]>()

    if (memberError) {
      throw new Error(memberError.message)
    }

    if (!memberData) {
      return []
    }

    return memberData.map(mapDBMemberToIMember)
  },

  addTeamMember: async (
    _teamId: bigint,
    _memberId: bigint
  ): Promise<ITeamMemberRelation> => {
    throw new Error('Not implemented')
  },

  removeTeamMember: async (_teamId: bigint, _memberId: bigint): Promise<void> => {
    throw new Error('Not implemented')
  }
}
