import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Spinner,
  HStack,
  Button,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { memberService } from '../service/memberService';
import { IMember } from '../interfaces/IMember';
import { Layout } from '../components/Layout';
import GitHubCalendar from 'react-github-calendar';

interface GHCalProps {
  username: string;
}

const GHCal: React.FC<GHCalProps> = ({ username }) => {
  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const content = (
    <GitHubCalendar
      username={extractGithubUsername(username)}
      colorScheme="light"
    />
  );

  return <Box style={centered}>{content}</Box>;
};

const extractGithubUsername = (maybeUrl: string) => {
  if (maybeUrl.startsWith('https://')) {
    return maybeUrl.split('/')[3];
  }

  return maybeUrl.indexOf('/') === -1
    ? maybeUrl
    : new URL(`https://${maybeUrl}`).pathname.split('/')[1];
};

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

  if (loading)
    return (
      <Layout>
        <VStack flex="1" justify="center" align="center">
          <Spinner size="xl" />
        </VStack>
      </Layout>
    );
  if (error || !member)
    return (
      <Layout>
        <Text color="red.500">{error || 'Member not found'}</Text>
      </Layout>
    );

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
          <Button
            as={RouterLink}
            to="/members"
            leftIcon={<FaArrowLeft />}
            alignSelf="flex-start"
          >
            Back to Members
          </Button>
          <HStack spacing={6}>
            <Avatar
              size="xl"
              name={`${member.firstName} ${member.lastName}`}
              src={member.profilePicture}
            />
            <VStack align="start" spacing={2}>
              <Heading size="xl">
                {member.firstName} {member.lastName}
              </Heading>
            </VStack>
          </HStack>
          {member.github !== '' ? (
            <GHCal username={member.github} />
          ) : (
            <Text fontSize="lg" color="gray.500">
              No GitHub calendar available
            </Text>
          )}
          {/* Add more member details here as needed */}
        </VStack>
      </Box>
    </Layout>
  );
};
