import { DBEvent, DBCreateEvent, DBMember, DBCreateMember, DBTeam, DBCreateTeam, DBTeamMemberRelation } from "./DBTypes";
import { IEvent } from "./IEvent";
import { IMember } from "./IMember";
import { ITeam, ITeamMemberRelation } from "./ITeam";

export const mapDBEventToIEvent = (dbEvent: DBEvent): IEvent => ({
  id: BigInt(dbEvent.id),
  createdAt: new Date(dbEvent.created_at),
  name: dbEvent.name,
  description: dbEvent.description,
  location: dbEvent.location,
  rsvpLink: dbEvent.rsvpLink,
  eventImage: dbEvent.eventImage,
});

export const mapIEventToDBCreateEvent = (event: IEvent): DBCreateEvent => ({
  name: event.name,
  description: event.description,
  location: event.location,
  rsvpLink: event.rsvpLink,
  eventImage: event.eventImage,
});

export const mapDBMemberToIMember = (dbMember: DBMember): IMember => ({
  memberId: BigInt(dbMember.memberId),
  createdAt: new Date(dbMember.created_at),
  firstName: dbMember.firstName,
  lastName: dbMember.lastName,
  email: dbMember.email,
  discord: dbMember.discord,
  linkedin: dbMember.linkedin || undefined,
  github: dbMember.github,
  profilePicture: dbMember.profilePicture,
  lead: dbMember.lead,
});

export const mapIMemberToDBCreateMember = (member: IMember): DBCreateMember => ({
  firstName: member.firstName,
  lastName: member.lastName,
  email: member.email,
  discord: member.discord,
  linkedin: member.linkedin,
  github: member.github,
  profilePicture: member.profilePicture,
  lead: member.lead,
});

export const mapDBTeamToITeam = (dbTeam: DBTeam): ITeam => ({
  teamId: BigInt(dbTeam.teamId),
  createdAt: new Date(dbTeam.created_at),
  name: dbTeam.name,
  logo: dbTeam.logo,
  deployLink: dbTeam.deployLink,
  githubRepo: dbTeam.githubRepo,
  lead: dbTeam.lead,
});

export const mapITeamToDBCreateTeam = (team: ITeam): DBCreateTeam => ({
  name: team.name || "",
  githubRepo: team.githubRepo || "",
  logo: team.logo || "",
  deployLink: team.deployLink,
  lead: team.lead,
});

export const mapDBTeamMemberRelationToITeamMemberRelation = (dbTeamMemberRelation: DBTeamMemberRelation): ITeamMemberRelation => ({
  id: BigInt(dbTeamMemberRelation.id),
  createdAt: new Date(dbTeamMemberRelation.created_at),
  teamId: BigInt(dbTeamMemberRelation.teamId),
  memberId: BigInt(dbTeamMemberRelation.memberId),
});