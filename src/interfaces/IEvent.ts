export interface IEvent {
  id?: bigint
  createdAt?: Date
  name: string
  description: string
  location: string
  rsvpLink?: string
  eventImage: string
}
