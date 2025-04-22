export interface DBEvent {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  rsvpLink: string;
  created_at: string;
}

export interface DBMember {
  memberId: number;
  firstName: string;
  lastName: string;
  email: string;
  github: string;
  discord: string;
  linkedin?: string;
  profilePicture: string;
  created_at: string;
  lead: boolean;
}

export interface DBTeam {
  teamId: number;
  name: string;
  githubRepo: string;
  logo: string;
  deployLink?: string;
  created_at: string;
  lead: boolean;
}

export interface DBSponsor {
  sponsorId: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  created_at: string;
}

export interface DBTeamMemberRelation {
  id: number;
  teamId: number;
  memberId: number;
  created_at: string;
}

export interface DBCreateEvent {
  name: string;
  description: string;
  location: string;
  image: string;
  rsvpLink: string;
}

export interface DBCreateMember {
  firstName: string;
  lastName: string;
  email: string;
  github: string;
  discord: string;
  linkedin?: string;
  profilePicture: string;
  lead: boolean;
}

export interface DBCreateTeam {
  name: string;
  githubRepo: string;
  logo: string;
  deployLink?: string;
  lead?: boolean;
}