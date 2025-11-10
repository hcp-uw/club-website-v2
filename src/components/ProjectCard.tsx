import React from 'react';
import {
    Image,
    Heading,
    Text,
    VStack,
    HStack,
    useColorModeValue,
    Button,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { ITeam } from '../interfaces/ITeam';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
    project: ITeam;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const headerColor = useColorModeValue('gray.700', 'gray.200');
    const descriptionColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <VStack
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.3s"
            bg={bgColor}
            width={{ base: 'sm', md: '100%' }}
            maxWidth="100%" // for mobile
            height="100%"
            minHeight="sm"
            gap="0"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
        >
            <VStack
                align="start"
                spacing="3"
                p="5"
                width="100%"
                height="100%"
            >
                {project.logo && (
                    <Image
                        src={project.logo}
                        alt="Project Logo"
                        boxSize="100px"
                        objectFit="contain"
                        borderRadius="10%"
                    />
                )}
                {/* Project Title */}
                <HStack spacing="5" height="3em">
                    <Heading size="md" noOfLines={2} color={headerColor} lineHeight="1.4">
                        {project.name}
                    </Heading>
                </HStack>
                {/* Project Description */}
                <Text color={descriptionColor} whiteSpace="pre-line">
                    {project.description}
                </Text>
                <HStack spacing={2} marginTop="auto">
                    {/* Live Demo Link */}
                    {project.deployLink && (
                        <Button
                            as="a"
                            href={project.deployLink}
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
                    {/* Github Link */}
                    {project.githubRepo && (
                        <Button
                            as="a"
                            href={project.githubRepo}
                            target="_blank"
                            size="sm"
                            rightIcon={<FaGithub />}
                            _hover={{
                                cursor: 'pointer',
                            }}
                        >
                            Github
                        </Button>
                    )}
                </HStack>
            </VStack>
        </VStack>
    );
};
