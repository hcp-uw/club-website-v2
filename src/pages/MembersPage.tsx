import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Heading,
  Spinner,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MemberCard } from "../components/MemberCard";
import { memberService } from "../service/memberService";
import { IMember } from "../interfaces/IMember";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";

enum SearchBy {
  FIRST_NAME = "First Name",
  LAST_NAME = "Last Name",
}

const leadSortingFunction = (a: IMember, b: IMember) => {
  if (a.lead === b.lead) return 0;
  return a.lead ? -1 : 1;
};

// Taking in an object for readability's sake when rendering
const renderMembers = (data: { members: IMember[]; isLead: boolean }) => {
  const { members, isLead } = data;

  const processedMembers = members.filter((member) => member.lead === isLead).sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    return 0;
  });

  if (processedMembers.length === 0) {
    return <></>;
  }
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">
        {isLead ? "Team Leads" : "All Members"}
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {processedMembers.map((member) => (
          <MemberCard key={member.memberId?.toString()} member={member} />
        ))}
      </SimpleGrid>
    </>
  );
};

export const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.FIRST_NAME);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await memberService.getAllMembers();
        fetchedMembers.sort(leadSortingFunction);
        setMembers(fetchedMembers);
        setFilteredMembers(fetchedMembers);
      } catch (err) {
        setError("Failed to fetch members");
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
        results = members.filter((member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case SearchBy.LAST_NAME:
        results = members.filter((member) =>
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        results = members;
    }
    results.sort(leadSortingFunction);
    setFilteredMembers(results);
  }, [searchTerm, members, searchBy]);

  if (loading)
    return (
      <Layout>
        <Spinner size="xl" />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <Text color="red.500">{error}</Text>
      </Layout>
    );

  return (
    <Layout>
      <Helmet>
        <title>Husky Coding Project Members</title>
        <meta
          name="description"
          content="Meet the talented members of Husky Coding Project — a community of developers, designers, and innovators at the University of Washington. Learn more about our team leads and members who collaboratively build impactful software projects, advance their technical skills, and drive innovation through teamwork and creativity."
        />
      </Helmet>
      <VStack spacing={8} align="stretch">
        <Heading>Members</Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
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
            {Object.values(SearchBy).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </InputGroup>
        {renderMembers({ members: filteredMembers, isLead: true })}
        {renderMembers({ members: filteredMembers, isLead: false })}
      </VStack>
    </Layout>
  );
};
