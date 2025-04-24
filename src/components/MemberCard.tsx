import React from 'react';
import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FaDiscord, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { IMember } from '../interfaces/IMember';
import { VALID_TEAMS } from '../interfaces/DBTypes';

interface MemberCardProps {
  member: IMember;
}

const COLOR_MAP: Record<(typeof VALID_TEAMS)[number], string> = {
  communications: 'red',
  design: 'blue',
  finance: 'green',
  education: 'purple',
  onboarding: 'pink',
  tech: 'yellow',
};

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  // const borderColor = useColorModeValue('gray.200', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const borderWidth = member.lead ? '2px' : '1px';

  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/members/${member.memberId}`)}
      // borderWidth="1px"
      borderWidth={borderWidth}
      borderRadius="lg"
      p={6}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      bg={bgColor}
      borderColor={borderColor}
      textDecoration="none"
    >
      <VStack spacing={4} align="center">
        <Avatar
          size="xl"
          name={`${member.firstName} ${member.lastName}`}
          src={member.profilePicture}
        />
        <VStack spacing={1} textAlign="center">
          <Text
            fontWeight="bold"
            fontSize="xl"
          >{`${member.firstName} ${member.lastName}`}</Text>
          {member.lead && (
            <Badge colorScheme={COLOR_MAP[member.team]}>{member.team}</Badge>
          )}
          <Text fontSize="sm" color="gray.500">
            {member.email}
          </Text>
        </VStack>
        <HStack spacing={4}>
          <Link
            href={`mailto:${member.email}`}
            isExternal
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              as={FaEnvelope}
              w={5}
              h={5}
              color="gray.500"
              _hover={{ color: 'blue.500' }}
            />
          </Link>
          <Link
            href={`https://discord.com/users/${member.discord}`}
            isExternal
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              as={FaDiscord}
              w={5}
              h={5}
              color="gray.500"
              _hover={{ color: 'blue.500' }}
            />
          </Link>
          <Link
            href={member.linkedin}
            isExternal
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              as={FaLinkedin}
              w={5}
              h={5}
              color="gray.500"
              _hover={{ color: 'blue.500' }}
            />
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};
