import { Team } from './DBTypes';

export interface IMember {
  memberId?: bigint;
  createdAt?: Date;
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  linkedin?: string;
  github: string;
  profilePicture: string;
  lead: boolean;
  team: Team;
}

export const COLOR_MAP: Record<Team, string> = {
  communications: 'red',
  design: 'blue',
  finance: 'green',
  education: 'purple',
  onboarding: 'pink',
  tech: 'yellow',
  'co-chair': 'orange',
};

