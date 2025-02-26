export interface ITeam {
  teamId?: bigint
  name?: string
  createdAt?: Date
  logo?: string
  deployLink?: string
  githubRepo?: string
  lead?: boolean;
}

export interface ITeamMemberRelation {
  id?: bigint
  createdAt?: Date
  teamId: bigint
  memberId: bigint
}