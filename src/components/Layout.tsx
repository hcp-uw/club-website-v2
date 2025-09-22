import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Container,
  useColorModeValue,
  Text,
  Link,
  HStack,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { HashLink as RouterLink } from 'react-router-hash-link';
import {
  FaGithub,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaBars,
} from 'react-icons/fa';
import HcpLogo from '../assets/logo-with-outline-without-tags.png';
import PurpleButton from './PurpleButton';

const NavItem = ({
  children,
  to,
  isMobile = false,
  onClick = () => {},
}: {
  children: React.ReactNode;
  to: string;
  isMobile?: boolean;
  onClick?: () => void;
}) => (
  <RouterLink to={to}>
    <Box
      px={1}
      py={1}
      w={isMobile ? 'full' : 'auto'}
      onClick={onClick}
      color="palette.darkPurple"
      fontSize="16px"
      fontWeight="500"
    >
      {children}
    </Box>
  </RouterLink>
);

const FooterLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactElement;
}) => (
  <Link href={href} isExternal>
    <Box as="span" fontSize="xl">
      {icon}
    </Box>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/teams/members', label: 'Projects' },
    { to: '/teams/leadership', label: 'Leadership' },
    // { to: '/members', label: 'Members' },
    { to: '/events', label: 'Events' },
    // { to: '/join', label: 'Join' },
    { to: '/sponsors', label: 'Sponsors' },
  ];

  // Shows/hides navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      minH="100vh"
      bg="white"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
    >
      <Box
        bg="white"
        position="fixed"
        w="full"
        zIndex={10}
        transition="top 0.5s ease-in-out"
        top={showNavbar ? '0' : '-76px'}
      >
        <Container maxW="container.xl">
          <Flex h="76px" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <RouterLink to="/">
                <Image
                  src={HcpLogo}
                  alt="HCP Logo"
                  w="70px"
                  objectFit="contain"
                />
              </RouterLink>

              {/* Desktop Navigation */}
              <HStack
                spacing="66px"
                display={{ base: 'none', lg: 'flex' }}
                ml="83px"
              >
                {navLinks.map((link) => (
                  <NavItem key={link.to} to={link.to}>
                    {link.label}
                  </NavItem>
                ))}
              </HStack>
            </Flex>

            {/* Mobile Menu Button */}
            <Flex gap="2">
              <RouterLink to="/#join">
                <Box display={{ base: 'none', lg: 'flex' }}>
                  <PurpleButton text="Join Us" />
                </Box>
              </RouterLink>
              <IconButton
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                variant="ghost"
                aria-label="Open menu"
                icon={<FaBars />}
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navLinks.map((link) => (
                <NavItem key={link.to} to={link.to} isMobile onClick={onClose}>
                  {link.label}
                </NavItem>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container
        maxW="container.xl"
        pt={20}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Container>

      <Box as="footer" py={6} mt={6}>
        <Container maxW="container.xl">
          <Flex
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', md: 'center' }}
            gap={4}
          >
            <Flex
              gap={{ base: '32px', md: '56px' }}
              direction={{ base: 'column', md: 'row' }}
              w={{ base: '100%', md: 'auto' }}
            >
              <RouterLink to="/">
                <Image
                  src={HcpLogo}
                  alt="HCP Logo"
                  w="70px"
                  objectFit="contain"
                />
              </RouterLink>
              <HStack
                spacing={{ base: 4, md: '27px' }}
                pl="4"
                alignSelf="flex-end"
              >
                <FooterLink
                  href="mailto:huskycodingproject@gmail.com"
                  icon={<FaEnvelope size="22px" color="#422f7e" />}
                />
                <FooterLink
                  href="https://www.instagram.com/hcp.uw/"
                  icon={<FaInstagram size="22px" color="#422f7e" />}
                />
                <FooterLink
                  href="https://www.linkedin.com/company/hcp-uw"
                  icon={<FaLinkedin size="22px" color="#422f7e" />}
                />
                <FooterLink
                  href="https://github.com/hcp-uw"
                  icon={<FaGithub size="22px" color="#422f7e" />}
                />
              </HStack>
            </Flex>
            <Text
              fontSize="12px"
              fontFamily="Space Mono, monospace"
              color="palette.darkPurple"
              casing="uppercase"
              display={{ base: 'none', md: 'block' }}
            >
              &copy; {new Date().getFullYear()} Husky Coding Project. All rights
              reserved.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
