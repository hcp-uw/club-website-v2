import React, { useState } from 'react';
import {
  Box, Image, Text, VStack, Link, Badge, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter,
  useDisclosure, Heading, List, ListItem, useColorModeValue, HStack, Avatar
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ITeam } from '../interfaces/ITeam';
import { teamService } from '../service/mock/teamService';
import { IMember } from '../interfaces/IMember';

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
      const members = (await Promise.all(
        relations.map(relation => teamService.getMemberById(relation.memberId))
      )).filter(member => member !== undefined) as IMember[];

      setTeamMembers(members);
      onOpen();
    } catch (error) {
      console.error("Error fetching team members:", error);
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
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={4} align="center">
          {team.logo && (
            <Image src={team.logo} alt="Team Logo" boxSize="100px" objectFit="contain" borderRadius="full" />
          )}
          <Text fontWeight="bold" fontSize="xl">{team.name || `Team ${team.teamId}`}</Text>
          {team.teamId !== null && team.teamId !== undefined && (
            <Badge colorScheme="green">PM ID: {team.teamId.toString()}</Badge>
          )}
          {team.deployLink && (
            <Link href={team.deployLink} isExternal color="blue.500" onClick={(e) => e.stopPropagation()}>
              View Deployment
            </Link>
          )}
          <Text fontSize="sm" color="gray.500">
            Created: {team.createdAt && new Date(team.createdAt).toLocaleDateString()}
          </Text>
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
                      <Avatar size="sm" name={`${member.firstName} ${member.lastName}`} />
                      <Text>{member.firstName} {member.lastName}</Text>
                      <Text fontSize="sm" color="gray.500">{member.email}</Text>
                    </HStack>
                  </ListItem>
                ))}
              </List>
              {teamMembers.length === 0 && <Text>No team members found.</Text>}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};