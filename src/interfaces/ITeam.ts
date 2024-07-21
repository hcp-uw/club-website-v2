export interface ITeam {
  teamId?: bigint
  name?: string | null
  createdAt?: Date
  logo?: string | null
  deployLink?: string | null
  githubRepo?: string | null
}

export interface ITeamMemberRelation {
  id?: bigint
  createdAt?: Date
  teamId: bigint
  memberId: bigint
}