export interface ISponsor {
    sponsorId: bigint
    sponsorName: string
    sponsorLogo: string
    sponsorLink: string
    sponsorDescription?: string
    createdAt?: Date
  }