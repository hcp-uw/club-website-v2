import React, { useState } from "react";
import {
  Box,
  Flex,
  Container,
  useColorModeValue,
  Text,
  Link,
  HStack,
  Button,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaGithub,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
      px={4}
      py={2}
      rounded="md"
      w={isMobile ? "full" : "auto"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.100", "gray.700"),
      }}
      onClick={onClick}
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

const MotionBox = motion(Box);

const Logo = () => {
  const logoText = useBreakpointValue({
    base: "<HCP/>", // Mobile version
    sm: "<HCP/>", // Still short version for small screens
    md: "<Husky Coding Project/>", // Full version for medium screens and up
  });

  return (
    <Box
      fontSize="1.5rem"
      fontWeight="bold"
      marginRight="1em"
      whiteSpace="nowrap" // Prevents wrapping
      fontFamily="monospace" // Optional: gives it more of a code-like appearance
    >
      {logoText}
    </Box>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const navBgColor = useColorModeValue("white", "gray.800");
  const footerBgColor = useColorModeValue("gray.50", "gray.900");

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const navLinks = [
    { to: '/teams/leadership', label: 'Leadership Teams' },
    { to: '/teams/members', label: 'Project Teams' },
    { to: '/members', label: 'Members' },
    { to: '/events', label: 'Events' },
    { to: '/join', label: 'Join' },
    { to: "/sponsors", label: "Sponsors" },
  ];

  return (
    <Box minH="100vh" bg={bgColor} display="flex" flexDirection="column">
      <Box
        bg={navBgColor}
        boxShadow="sm"
        position="fixed"
        width="full"
        zIndex={10}
      >
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <RouterLink to="/">
                <Logo />
              </RouterLink>

              {/* Desktop Navigation */}
              <HStack spacing={1} display={{ base: "none", md: "flex" }}>
                {navLinks.map((link) => (
                  <NavItem key={link.to} to={link.to}>
                    {link.label}
                  </NavItem>
                ))}
              </HStack>
            </Flex>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              variant="ghost"
              aria-label="Open menu"
              icon={<FaBars />}
            />
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

      <Container maxW="container.xl" pt={20} flex={1}>
        {children}
      </Container>

      <Box as="footer" bg={footerBgColor} py={6} mt={8}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={4}
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              alignItems={{ base: "flex-start", sm: "center" }}
              gap={4}
            >
              <Button
                onClick={toggleExpand}
                variant="link"
                fontWeight="bold"
                rightIcon={<FaChevronRight />}
                transform={isExpanded ? "scaleY(1.01)" : "none"}
                transition="transform 0.3s"
              >
                Connect with us
              </Button>
              <AnimatePresence>
                {isExpanded && (
                  <MotionBox
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    overflow="hidden"
                  >
                    <HStack spacing={{ base: 4, md: 10 }}>
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
                  </MotionBox>
                )}
              </AnimatePresence>
            </Flex>
            <Text>
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
