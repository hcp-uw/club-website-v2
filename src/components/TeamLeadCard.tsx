import React, { useState } from 'react'
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
  Avatar
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IMember, COLOR_MAP } from '../interfaces/IMember'
import { memberService } from '../service/memberService'

import { Team } from '../interfaces/DBTypes'

interface TeamCardProps {
  team: Team
}

const MotionBox = motion(Box)

export const TeamLeadCard: React.FC<TeamCardProps> = ({team}) => {

  const formatTeamName = (team: string): string => {
    return team[0].toUpperCase() + team.slice(1) + ' Team'
  };

  const TEAM_NAME = formatTeamName(team)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [teamMembers, setTeamMembers] = useState<IMember[]>([])
  const [isLoading, setIsLoading] = useState(false)


  const teamColor = COLOR_MAP[team]
  const borderColor = useColorModeValue(`${teamColor}.300`, `${teamColor}.500`)
  const bgColor = useColorModeValue('white', 'gray.800')

  const handleClick = async () => {

    try {
      setIsLoading(true)
      const teamLeads = await memberService.getMembersbyTeam(team)

      setTeamMembers(teamLeads)
      onOpen()

    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MotionBox
        borderWidth='1px'
        borderRadius='lg'
        p={6}
        boxShadow='md'
        cursor='pointer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={4} align='center'>
          <Text fontWeight='bold' fontSize='xl'>
            {`${TEAM_NAME}`}
          </Text>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${TEAM_NAME}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align='start' spacing={4}>
              <Heading size='md'>Team Members</Heading>
              <List spacing={3} width='100%'>
                {teamMembers.map(member => (
                  <ListItem key={member.memberId?.toString()}>
                    <HStack>
                      <Avatar
                        size='sm'
                        name={`${member.firstName} ${member.lastName}`}
                      />
                      <Text>
                        {member.firstName} {member.lastName}
                      </Text>
                      <Text fontSize='sm' color='gray.500'>
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
