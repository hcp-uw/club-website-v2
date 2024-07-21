import React, { useState, useEffect } from 'react';
import { SimpleGrid, Heading, Spinner, Text, VStack, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { MemberCard } from '../components/MemberCard';
import { memberService } from '../service/mock/memberService';
import { IMember } from '../interfaces/IMember';
import { Layout } from '../components/Layout';

enum SearchBy {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  DISCORD = 'Discord',
}

export const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.FIRST_NAME);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await memberService.getAllMembers();
        setMembers(fetchedMembers);
        setFilteredMembers(fetchedMembers);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    let results;
    switch (searchBy) {
      case SearchBy.FIRST_NAME:
        results = members.filter(member =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case SearchBy.LAST_NAME:
        results = members.filter(member =>
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case SearchBy.EMAIL:
        results = members.filter(member =>
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case SearchBy.DISCORD:
        results = members.filter(member =>
          member.discord.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        results = members;
    }
    setFilteredMembers(results);
  }, [searchTerm, members, searchBy]);

  if (loading) return <Layout><Spinner size="xl" /></Layout>;
  if (error) return <Layout><Text color="red.500">{error}</Text></Layout>;

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Members</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as SearchBy)}
            w="15%"
            paddingLeft={6}
          >
            {Object.values(SearchBy).map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </Select>
        </InputGroup>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {filteredMembers.map(member => (
            <MemberCard key={member.memberId?.toString()} member={member} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};