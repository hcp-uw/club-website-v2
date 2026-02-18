import { Box, Flex, Text, Grid, GridItem, VStack, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { memberService } from '../service/memberService';
import { IMember } from '../interfaces/IMember';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { MemberCard } from '../components/MemberCard';

export const AboutPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<IMember[]>([]);

  const processedMembers = members
    .filter((member) => member.lead)
    .sort((a, b) => a.team.localeCompare(b.team));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await memberService.getAllMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <VStack gap={6}>
      <Helmet>
        <title>About</title>
        <meta
          name="description"
          content="Learn about the Husky Coding Project's mission to provide real-world, team-based programming experience and bridge the gap for aspiring software developers."
        />
      </Helmet>
      <Flex direction="column" w={{ base: '90%', md: '500px', lg: '100%' }} marginTop={'3em'}>
        <Text
          fontSize={['3xl', '4xl', '5xl', '6xl']}
          fontWeight="semibold"
          marginTop="1em"
        >
          The Problem
        </Text>
        <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
          The majority of projects offered by CS coursework are solo or in
          pairs, so future programmers miss out on the invaluable experience of
          working in larger teams. Additionally, the leading motivation to do CS
          class projects are for grades, rather than for the learning
          experience.
        </Text>
      </Flex>
      <Flex direction="column" w={{ base: '90%', md: '500px', lg: '100%' }} marginTop={'3em'}>
        <Text fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="semibold">
          The Why
        </Text>

        <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
          Getting internships is the best ways to gain real world experience
          on the job. However, it is also quite difficult to obtain without
          having some prior experience.
        </Text>
        <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
          This circular logic plagues every generation of programmers.
        </Text>
      </Flex>
      <Flex direction="column" w={{ base: '90%', md: '500px', lg: '100%' }} marginTop={'3em'}>
        <Text fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="semibold">
          Our Mission
        </Text>
        <Box marginBottom={'3em'}>
          <Text
            fontSize={['md', 'xl', '2xl']}
            display="inline"
            marginTop="1em"
          >
            To create a tech internship-like environment that promotes the
            growth and development of our club members. We provide team-based
            programming project experience and encourage
          </Text>
          <Text
            fontSize={['md', 'xl', '2xl']}
            display="inline"
            color="brand.pink"
          >
            { } peer-to-peer learning
          </Text>
          <Text fontSize={['md', 'xl', '2xl']} display="inline">
            { } to provide the next generation of programmers & designers with
            the tools and experience to
          </Text>
          <Text
            fontSize={['md', 'xl', '2xl']}
            display="inline"
            color="brand.pink"
          >
            { } succeed in future tech careers.
          </Text>
        </Box>
      </Flex>
      <Flex direction="column" w={{ base: '90%', md: '500px', lg: '100%' }} marginTop={'3em'}>
        <Text fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="semibold">
          Our Team
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {processedMembers.map((member) => (
            <MemberCard key={member.memberId?.toString()} member={member} />
          ))}
        </SimpleGrid>
      </Flex>
    </VStack>
  );
};
