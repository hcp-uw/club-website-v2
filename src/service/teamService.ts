import { supabase } from './client'
import { DBMember, DBTeam, DBTeamMemberRelation } from '../interfaces/DBTypes'
import { ITeam, ITeamMemberRelation } from '../interfaces/ITeam'
import { IMember } from '../interfaces/IMember'
import { mapDBTeamToITeam, mapDBTeamMemberRelationToITeamMemberRelation, mapDBMemberToIMember } from '../interfaces/mapping'
import { Octokit } from "@octokit/core";

const API_URL = 'your-api-url'

const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const ORG_NAME = "hcp-uw";

// export const teamService = {
//   getAllTeams: async (lead: boolean = false): Promise<ITeam[]> => {
//     let { data: teamData, error: teamError } = await supabase
//       .from('Teams')
//       .select('*')
//       .returns<DBTeam[]>()
//       .eq('lead', lead)


export const teamService = {
  getAllTeams: async (lead: boolean = false): Promise<ITeam[]> => {
    const query = supabase
      .from('Teams')
      .select('*');

    const filteredQuery = lead !== undefined
      ? query.eq('lead', lead)
      : query;

    const { data: teamData, error: teamError } = await filteredQuery.returns<DBTeam[]>();

    if (teamError) {
      throw new Error(teamError.message)
    }
    if (!teamData) {
      return []
    }

    return teamData.map(mapDBTeamToITeam);
  },
  /** Fetch teams from GitHub */
  // fetchGitHubTeams: async (): Promise<ITeam[]> => {
  //   if (!GITHUB_ACCESS_TOKEN) {
  //     console.error("GitHub API token is missing.");
  //     return [];
  //   }

  //   const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });

  //   try {
  //     const response = await octokit.request("GET /orgs/{org}/teams", {
  //       org: ORG_NAME,
  //       headers: { "X-GitHub-Api-Version": "2022-11-28" },
  //       per_page: 100, // TODO: add pagination to teams section 
  //     });

  //     // Convert GitHub teams to match ITeam structure
  //     return response.data.map((team: { id: number; name: string }) => ({
  //       teamId: BigInt(team.id),
  //       name: team.name,
  //       createdAt: new Date(),
  //       logo: `https://wivolixjgzmaigovvchs.supabase.co/storage/v1/object/public/club-website-assets/Teams/${team.name.toLowerCase()}-logo.png`,
  //       deployLink: "",
  //       githubRepo: "",
  //       lead: false,
  //     }));

  //   } catch (error) {
  //     console.error("GitHub API Error:", error);
  //     return [];
  //   }
  // },

  getTeamById: async (id: bigint): Promise<ITeam> => {
    let { data: teamData, error: teamError } = await supabase
      .from('Teams')
      .select('*')
      .eq('teamId', Number(id))
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
