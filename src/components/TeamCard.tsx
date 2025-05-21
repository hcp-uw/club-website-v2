import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Heading,
  List,
  ListItem,
  useColorModeValue,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ITeam } from '../interfaces/ITeam';
import { teamService } from '../service/teamService';
import { IMember } from '../interfaces/IMember';
import { memberService } from '../service/memberService';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

interface TeamCardProps {
  team: ITeam;
}

const MotionBox = motion(Box);

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamMembers, setTeamMembers] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const relations = await teamService.getTeamMembers(team.teamId!);
      const members = (
        await Promise.all(
          relations.map((relation) =>
            relation.memberId
              ? memberService.getMemberById(relation.memberId)
              : undefined
          )
        )
      ).filter((member) => member !== undefined) as IMember[];

      setTeamMembers(members);
      onOpen();
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MotionBox
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
        cursor="pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={4} align="start" height="100%">
          {team.logo && (
            <Image
              src={team.logo}
              alt="Team Logo"
              boxSize="100px"
              objectFit="contain"
              borderRadius="10%"
            />
          )}
          <Text fontWeight="bold" fontSize="xl">
            {team.name || `Team ${team.teamId}`}
          </Text>
          <Text fontSize="md">
            {team.description || 'No description available'}
          </Text>
          <HStack spacing={2} marginTop="auto">
            {team.deployLink && (
              <Button
                as="a"
                href={team.deployLink}
                target="_blank"
                size="sm"
                backgroundColor="purple.500"
                color="white"
                rightIcon={<FiExternalLink color="white" />}
                _hover={{
                  cursor: 'pointer',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </Button>
            )}
            {team.githubRepo && (
              <Button
                as="a"
                href={`https://github.com/hcp-uw/${team.githubRepo}`}
                target="_blank"
                size="sm"
                rightIcon={<FaGithub />}
                _hover={{
                  cursor: 'pointer',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Github
              </Button>
            )}
          </HStack>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{team.name || `Team ${team.teamId}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <Heading size="md">Team Members</Heading>
              <List spacing={3} width="100%">
                {teamMembers.map((member) => (
                  <ListItem key={member.memberId?.toString()}>
                    <HStack>
                      <Avatar
                        size="sm"
                        name={`${member.firstName} ${member.lastName}`}
                      />
                      <Text>
                        {member.firstName} {member.lastName}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {member.email}
                      </Text>
                    </HStack>
                  </ListItem>
                ))}
              </List>
              {teamMembers.length === 0 && <Text>No team members found.</Text>}
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
