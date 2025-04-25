import { IMember } from '../../interfaces/IMember';

// Mock data for members
export const mockMembers: IMember[] = [
  {
    memberId: 1n,
    createdAt: new Date(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    discord: 'john_doe#1234',
    linkedin: 'https://www.linkedin.com/johndoe',
    github: 'elimelt',
    profilePicture: 'john-doe.jpg',
    lead: true,
    team: 'communications',
  },
  {
    memberId: 2n,
    createdAt: new Date(),
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    discord: 'jane_smith#5678',
    linkedin: 'https://www.linkedin.com/janesmith',
    github: 'janesmith',
    profilePicture: 'jane-smith.jpg',
    lead: false,
    team: 'design',
  },
];

export const memberService = {
  getAllMembers: async (): Promise<IMember[]> => {
    return mockMembers;
  },

  getMemberById: async (id: bigint): Promise<IMember | undefined> => {
    return mockMembers.find((member) => member.memberId === id);
  },

  createMember: async (
    member: Omit<IMember, 'memberId' | 'createdAt'>
  ): Promise<IMember> => {
    const newMember: IMember = {
      memberId: BigInt(mockMembers.length + 1),
      createdAt: new Date(),
      ...member,
    };
    mockMembers.push(newMember);
    return newMember;
  },

  updateMember: async (
    id: bigint,
    member: Partial<IMember>
  ): Promise<IMember | undefined> => {
    const index = mockMembers.findIndex((m) => m.memberId === id);
    if (index !== -1) {
      mockMembers[index] = { ...mockMembers[index], ...member };
      return mockMembers[index];
    }
    return undefined;
  },

  deleteMember: async (id: bigint): Promise<void> => {
    const index = mockMembers.findIndex((member) => member.memberId === id);
    if (index !== -1) {
      mockMembers.splice(index, 1);
    }
  },
};
