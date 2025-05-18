import React from 'react';
import {
  Box,
  Avatar,
  Text,
  VStack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FaDiscord, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { COLOR_MAP, IMember } from '../interfaces/IMember';
import { useNavigate } from 'react-router-dom';
import { IMember } from '../interfaces/IMember';
import { Team } from '../interfaces/DBTypes';

interface MemberCardProps {
  member: IMember;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const borderWidth = member.lead ? '2px' : '1px';

  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/members/${member.memberId}`)}
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
        </VStack>
      </VStack>
    </Box>
  );
};
