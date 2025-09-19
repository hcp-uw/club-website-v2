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
import { Link as RouterLink } from 'react-router-dom';
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

  const footerBgColor = useColorModeValue('gray.50', 'gray.900');

  const navLinks = [
    { to: '/', label: 'About' },
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
    <Box minH="100vh" bg="white" display="flex" flexDirection="column">
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
              {/* TODO: Update link */}
              <RouterLink to="/">
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

      <Box as="footer" bg={footerBgColor} py={6} mt={6}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', md: 'center' }}
            gap={4}
          >
            <HStack spacing={{ base: 4, md: 10 }} pl="4">
              <FooterLink
                href="mailto:huskycodingproject@gmail.com"
                icon={<FaEnvelope />}
              />
              <FooterLink
                href="https://github.com/hcp-uw"
                icon={<FaGithub />}
              />
              <FooterLink
                href="https://www.linkedin.com/company/hcp-uw"
                icon={<FaLinkedin />}
              />
              <FooterLink
                href="https://www.instagram.com/hcp.uw/"
                icon={<FaInstagram />}
              />
            </HStack>
            <Text pl="4" pr="4">
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
