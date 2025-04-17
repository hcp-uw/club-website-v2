import { DBEvent, DBCreateEvent, DBMember, DBCreateMember, DBTeam, DBCreateTeam, DBTeamMemberRelation, DBSponsor } from "./DBTypes";
import { IEvent } from "./IEvent";
import { IMember } from "./IMember";
import { ISponsor } from "./ISponsor";
import { ITeam, ITeamMemberRelation } from "./ITeam";

export const mapDBEventToIEvent = (dbEvent: DBEvent): IEvent => ({
  id: BigInt(dbEvent.id),
  createdAt: new Date(dbEvent.created_at),
  name: dbEvent.name,
  description: dbEvent.description,
  location: dbEvent.location,
  image: dbEvent.image,
  start_time: new Date(dbEvent.start_time),
  end_time: new Date(dbEvent.end_time),
});

export const mapIEventToDBCreateEvent = (event: IEvent): DBCreateEvent => ({
  name: event.name,
  description: event.description,
  location: event.location,
  image: event.image,
  start_time: event.start_time.toISOString(),
  end_time: event.end_time.toISOString(),
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

export const mapDBSponsorToISponsor = (dbSponsor: DBSponsor): ISponsor => ({
  sponsorId: BigInt(dbSponsor.sponsorId),
  name: dbSponsor.name,
  logo: dbSponsor.logo,
  website: dbSponsor.website,
  description: dbSponsor.description,
  createdAt: new Date(dbSponsor.created_at),

})

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