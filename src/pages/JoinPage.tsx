import React from 'react';
import { keyframes } from '@emotion/react';
import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const pulseKeyframe = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(88, 101, 242, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(88, 101, 242, 0); }
  100% { box-shadow: 0 0 0 0 rgba(88, 101, 242, 0); }
`;

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const JoinPage: React.FC = () => {
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1"
      color={textColor}
    >
      <Helmet>
        <title>Join HCP</title>
        <meta
          name="description"
          content="Join the Husky Coding Project community on Discord to collaborate on projects and gain software development experience."
        />
      </Helmet>
      <VStack spacing={8} align="center" maxWidth="600px" textAlign="center">
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Join Our Community
          </Heading>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Text fontSize="xl" mb={6}>
            Come and build cool projects with us
          </Text>
        </MotionBox>

        <MotionButton
          as={Button}
          leftIcon={<FaDiscord />}
          size="lg"
          colorScheme="purple"
          _hover={{ transform: 'translateY(-5px)' }}
          style={{ transition: 'all 0.2s' }}
          onClick={() => window.open('https://discord.gg/WDh6VPmjyY', '_blank')}
          animation={`${pulseKeyframe} 2s infinite`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join our Discord
        </MotionButton>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Text fontSize="sm" mt={8}>
            By joining, you agree to our community guidelines and code of
            conduct.
          </Text>
        </MotionBox>
      </VStack>
    </Box>
  );
};
