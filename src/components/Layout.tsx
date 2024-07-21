import React, { useState } from 'react'
import {
  Box,
  Flex,
  Container,
  useColorModeValue,
  Text,
  Link,
  HStack,
  Button,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaTwitter, FaLinkedin, FaInstagram, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const NavItem = ({
  children,
  to
}: {
  children: React.ReactNode
  to: string
}) => (
  <RouterLink to={to}>
    <Box
      px={4}
      py={2}
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.100', 'gray.700')
      }}
    >
      {children}
    </Box>
  </RouterLink>
)

const FooterLink = ({ href, icon }: { href: string; icon: React.ReactElement }) => (
  <Link href={href} isExternal>
    <Box as="span" fontSize="xl">
      {icon}
    </Box>
  </Link>
)

const MotionBox = motion(Box)

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const navBgColor = useColorModeValue('white', 'gray.800')
  const footerBgColor = useColorModeValue('gray.50', 'gray.900')
  const Logo = () => (
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: "1em" }}>
      {"<Husky Coding Project/>"}
    </span>
  )

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Box minH='100vh' bg={bgColor} display="flex" flexDirection="column">
      <Box
        bg={navBgColor}
        boxShadow='sm'
        position='fixed'
        width='full'
        zIndex={10}
      >
        <Container maxW='container.xl'>
          <Flex h={16} alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <RouterLink to='/'>
                <Logo />
              </RouterLink>
              <NavItem to='/members'>Members</NavItem>
              <NavItem to='/teams'>Teams</NavItem>
              <NavItem to='/events'>Events</NavItem>
              <NavItem to='/about'>About</NavItem>
              <NavItem to='/join'>Join</NavItem>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW='container.xl' pt={20} flex={1}>
        {children}
      </Container>
      <Box as="footer" bg={footerBgColor} py={6} mt={8}>
        <Container maxW='container.xl'>
          <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Flex alignItems="center">
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
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    overflow="hidden"
                    ml={4}
                  >
                    <HStack spacing={10}>
                      <FooterLink href="mailto:your-email@example.com" icon={<FaEnvelope />} />
                      <FooterLink href="https://github.com/your-org/your-repo" icon={<FaGithub />} />
                      <FooterLink href="https://twitter.com/your-twitter" icon={<FaTwitter />} />
                      <FooterLink href="https://linkedin.com/company/your-company" icon={<FaLinkedin />} />
                      <FooterLink href="https://instagram.com/your-instagram" icon={<FaInstagram />} />
                    </HStack>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Flex>
            <Text>&copy; {new Date().getFullYear()} Husky Coding Project. All rights reserved.</Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}