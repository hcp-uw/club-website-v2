import { ISponsor } from "../../interfaces/ISponsor";

// Mock data for sponsors
export const mockSponsors: ISponsor[] = [
    {
        sponsorId: 1n,
        sponsorName: "Skill Cat",
        sponsorLogo: "skillCatLogo.png", // Ensure this path is correct
        sponsorLink: "https://www.skillcatapp.com/",
        sponsorDescription: "SkillCat is an innovative online platform that helps students and professionals gain certifications and skills in the skilled trades.",
        createdAt: new Date()
    }
];

export const sponsorService = {
    getAllSponsors: async (): Promise<ISponsor[]> => {
        return mockSponsors;
    },

    getSponsorById: async (id: bigint): Promise<ISponsor | undefined> => {
        return mockSponsors.find(sponsor => sponsor.sponsorId === id);
    },

    createSponsor: async (sponsor: Omit<ISponsor, 'sponsorId' | 'createdAt'>): Promise<ISponsor> => {
        const newSponsor: ISponsor = {
            sponsorId: BigInt(mockSponsors.length + 1),
            createdAt: new Date(),
            ...sponsor,
        };
        mockSponsors.push(newSponsor);
        return newSponsor;
    },

    updateSponsor: async (id: bigint, sponsor: Partial<ISponsor>): Promise<ISponsor | undefined> => {
        const index = mockSponsors.findIndex(s => s.sponsorId === id);
        if (index !== -1) {
            mockSponsors[index] = { ...mockSponsors[index], ...sponsor };
            return mockSponsors[index];
        }
        return undefined;
    },

    deleteSponsor: async (id: bigint): Promise<void> => {
        const index = mockSponsors.findIndex(s => s.sponsorId === id);
        if (index !== -1) {
            mockSponsors.splice(index, 1);
        }
    }
}