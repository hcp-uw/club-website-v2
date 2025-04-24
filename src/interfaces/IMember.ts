import { VALID_TEAMS } from './DBTypes';

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
  team: (typeof VALID_TEAMS)[number];
}
