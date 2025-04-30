import {
  DBEvent,
  DBCreateEvent,
  DBMember,
  DBCreateMember,
  DBTeam,
  DBCreateTeam,
  DBTeamMemberRelation,
  DBSponsor,
} from './DBTypes';
import { IEvent } from './IEvent';
import { IMember } from './IMember';
import { ISponsor } from './ISponsor';
import { ITeam, ITeamMemberRelation } from './ITeam';

export const mapDBEventToIEvent = (dbEvent: DBEvent): IEvent => ({
  id: BigInt(dbEvent.id),
  createdAt: new Date(dbEvent.created_at),
  name: dbEvent.name,
  description: dbEvent.description,
  location: dbEvent.location,
  image: dbEvent.image,
  startTime: new Date(dbEvent.start_time),
  endTime: new Date(dbEvent.end_time),
  linkURL: dbEvent.link_url || undefined,
  linkTitle: dbEvent.link_title || undefined,
});

export const mapIEventToDBCreateEvent = (event: IEvent): DBCreateEvent => ({
  name: event.name,
  description: event.description,
  location: event.location,
  image: event.image,
  start_time: event.startTime.toISOString(),
  end_time: event.endTime.toISOString(),
  link_url: event.linkURL || undefined,
  link_title: event.linkTitle || undefined,
});

export const mapDBMemberToIMember = (dbMember: DBMember): IMember => ({
  ...dbMember,
  memberId: BigInt(dbMember.memberId),
  createdAt: new Date(dbMember.created_at),
  linkedin: dbMember.linkedin || undefined,
  team: dbMember.teamleads,
});

export const mapIMemberToDBCreateMember = (
  member: IMember
): DBCreateMember => ({
  ...member,
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
});

export const mapITeamToDBCreateTeam = (team: ITeam): DBCreateTeam => ({
  name: team.name || '',
  githubRepo: team.githubRepo || '',
  logo: team.logo || '',
  deployLink: team.deployLink,
  lead: team.lead || false,
});

export const mapDBTeamMemberRelationToITeamMemberRelation = (
  dbTeamMemberRelation: DBTeamMemberRelation
): ITeamMemberRelation => ({
  id: BigInt(dbTeamMemberRelation.id),
  createdAt: new Date(dbTeamMemberRelation.created_at),
  teamId: BigInt(dbTeamMemberRelation.teamId),
  memberId: BigInt(dbTeamMemberRelation.memberId),
});
