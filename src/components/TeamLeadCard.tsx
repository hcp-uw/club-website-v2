import React, { useState } from 'react';
import {
  Box,
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
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IMember, COLOR_MAP } from '../interfaces/IMember';
import { memberService } from '../service/memberService';
import { Team } from '../interfaces/DBTypes';
import { ITeam, LEADERSHIP_ID_MAP } from '../interfaces/ITeam';

interface TeamCardProps {
  team: ITeam;
}

const MotionBox = motion(Box);

export const TeamLeadCard: React.FC<TeamCardProps> = ({ team }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamMembers, setTeamMembers] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const teamIDName = LEADERSHIP_ID_MAP[Number(team.teamId)] as Team;
  const teamColor = COLOR_MAP[teamIDName];
  const borderColor = useColorModeValue(`${teamColor}.300`, `${teamColor}.500`);
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const teamLeads = await memberService.getMembersbyTeam(teamIDName);

      setTeamMembers(teamLeads);
      setError(false);
      onOpen();
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MotionBox
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        cursor="pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        bg={bgColor}
        borderColor={borderColor}
        overflow="hidden"
        minHeight="sm"
      >
        <Image
          src={team.logo}
          alt="Team Logo"
          objectFit="cover"
          height="48"
          width="100%"
        />
        <VStack
          align="start"
          spacing="3"
          p="5"
          paddingTop="4"
          width="100%"
          height="100%"
        >
          <Text fontWeight="bold" fontSize="xl">
            {team.name}
          </Text>
          <Text whiteSpace="pre-line">{team.description}</Text>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{team.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
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
