import { Team } from './DBTypes';

export interface ITeam {
  teamId: bigint;
  name?: string;
  createdAt?: Date;
  logo?: string;
  deployLink?: string;
  githubRepo?: string;
  lead?: boolean;
  description?: string;
  projectYear?: number;
}

export interface ITeamMemberRelation {
  id?: bigint;
  createdAt?: Date;
  teamId: bigint;
  memberId: bigint;
}

export const LEADERSHIP_ID_MAP: Record<number, Team> = {
  0: 'co-chair',
  1: 'tech',
  2: 'finance',
  3: 'communications',
  4: 'onboarding',
  5: 'education',
  6: 'design',
};
