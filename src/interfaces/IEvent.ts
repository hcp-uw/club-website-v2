export interface IEvent {
  id?: bigint
  createdAt?: Date
  name: string
  description: string
  location: string
  image: string
  start_time: Date
  end_time: Date
}
