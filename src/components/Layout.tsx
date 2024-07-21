import React from 'react';
import { Box, Flex, Container, useColorModeValue, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavItem = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <RouterLink to={to}>
    <Box
      px={4}
      py={2}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.100', 'gray.700'),
      }}
    >
      {children}
    </Box>
  </RouterLink>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const navBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={navBgColor} boxShadow="sm" position="fixed" width="full" zIndex={10}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <RouterLink to="/">
                <Image src="https://wivolixjgzmaigovvchs.supabase.co/storage/v1/object/public/club-website-assets/club-logo.png?t=2024-07-21T10%3A44%3A14.086Z" alt="Logo" h="40px" mr={4} />
              </RouterLink>
              <NavItem to="/members">Members</NavItem>
              <NavItem to="/teams">Teams</NavItem>
              <NavItem to="/events">Events</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/join">Join</NavItem>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" pt={20}>
        {children}
      </Container>
    </Box>
  );
};