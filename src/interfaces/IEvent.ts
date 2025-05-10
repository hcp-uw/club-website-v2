export interface IEvent {
  id?: bigint;
  createdAt?: Date;
  name: string;
  description: string;
  location: string;
  image: string;
  startTime: Date;
  endTime: Date;
  linkURL?: string;
  linkTitle?: string;
}
