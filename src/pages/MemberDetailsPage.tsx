import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box, VStack, Heading, Text, Spinner, Image, HStack, Icon, Link, Button,
  useColorModeValue
} from '@chakra-ui/react';
import { FaDiscord, FaLinkedin, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { memberService } from '../service/mock/memberService';
import { IMember } from '../interfaces/IMember';
import { Layout } from '../components/Layout';
import GitHubCalendar from 'react-github-calendar';

1
interface GHCalProps {
  username: string;
}

const GHCal: React.FC<GHCalProps> = ({ username }) => {
  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const content = <GitHubCalendar username={extractUsername(username)} colorScheme='light' />

  return (
    <Box style={centered}>
      {content}
    </Box>
  )
}

const extractUsername = (maybeUrl: string) =>
  (maybeUrl.indexOf("/") === -1)
    ? maybeUrl
    : new URL(maybeUrl).pathname.split('/')[1]


export const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (id) {
          const fetchedMember = await memberService.getMemberById(BigInt(id));
          if (fetchedMember === undefined) {
            throw new Error('Member not found');
          }
          setMember(fetchedMember);
        }
      } catch (err) {
        setError('Failed to fetch member details');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) return <Layout><Spinner size="xl" /></Layout>;
  if (error || !member) return <Layout><Text color="red.500">{error || 'Member not found'}</Text></Layout>;

  return (
    <Layout>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
        maxWidth="800px"
        margin="auto"
      >
        <VStack spacing={6} align="stretch">
          <Button as={RouterLink} to="/members" leftIcon={<FaArrowLeft />} alignSelf="flex-start">
            Back to Members
          </Button>
          <HStack spacing={6}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={member.profilePicture}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <VStack align="start" spacing={2}>
              <Heading size="xl">{member.firstName} {member.lastName}</Heading>
              <Text fontSize="lg" color="gray.500">{member.email}</Text>
            </VStack>
          </HStack>
          <GHCal username={member.github} />
          <HStack spacing={4}>
            <Link href={`mailto:${member.email}`} isExternal>
              <Icon as={FaEnvelope} w={6} h={6} color="gray.500" _hover={{ color: 'blue.500' }} />
            </Link>
            <Link href={`https://discord.com/users/${member.discord}`} isExternal>
              <Icon as={FaDiscord} w={6} h={6} color="gray.500" _hover={{ color: 'blue.500' }} />
            </Link>
            <Link href={member.linkedin} isExternal>
              <Icon as={FaLinkedin} w={6} h={6} color="gray.500" _hover={{ color: 'blue.500' }} />
            </Link>
          </HStack>
          {/* Add more member details here as needed */}
        </VStack>
      </Box>
    </Layout>
  );
};