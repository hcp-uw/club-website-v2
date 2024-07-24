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
  transition,
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
      mr={2}
      rounded='md'
      fontWeight={500}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.100', 'gray.700'),
        transition: "0.1s"
      }}
    >
      {children}
    </Box>
  </RouterLink>
)

const FooterContainer = ({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) => (
  <Flex direction={'column'} mr={20}>
    <Text fontWeight="500" fontSize="2xl" mb={2}>{title}</Text>
    {children}
  </Flex>
)

const FooterLink = ({ link, type, name }: { link: string; type: string, name: string }) => {
  if (type === "general") {
    return (
      <RouterLink to={link}>
        <Text fontSize="lg" mb={0.5} _hover={{color: "#7448f7", transition: "0.2s"}}>{name}</Text>
      </RouterLink>
    )
  } else if (type === "follow") {
    return (
      <Link fontSize="lg" mb={0.5} href={link} isExternal _hover={{ color: "#7448f7", transition: "0.05s", textDecoration: "none"}}>
        {name}
      </Link>
    )
  } else {
    return (
      <Link fontSize="lg" mb={0.5} href={"mailto:" + link} isExternal _hover={{ color: "#7448f7", transition: "0.05s", textDecoration: "none"}}>
        {name}
      </Link>
    )
  }

}

// const FooterLink = ({ href, icon }: { href: string; icon: React.ReactElement }) => (
//   <Link href={href} isExternal>
//     <Box as="span" fontSize="xl">
//       {icon}
//     </Box>
//   </Link>
// )

const MotionBox = motion(Box)

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // const [isExpanded, setIsExpanded] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const navBgColor = useColorModeValue('white', 'gray.800')
  const footerBgColor = useColorModeValue('gray.50', 'gray.900')
  const Logo = () => (
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: "1em" }}>
      {"<Husky Coding Project/>"}
    </span>
  )

  // const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Box minH='100vh' bg={bgColor} display="flex" flexDirection="column">
      <Box
        bg={navBgColor}
        // boxShadow='sm'
        width='full'
        zIndex={10}
      >
        <Container maxW='6xl'>
          <Flex h={24} alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <RouterLink to='/'>
                <Logo />
              </RouterLink>
              <NavItem to='/members'>Members</NavItem>
              <NavItem to='/teams'>Teams</NavItem>
              <NavItem to='/events'>Events</NavItem>
              {/* <NavItem to='/about'>About</NavItem> */}
              <NavItem to='/join'>Join</NavItem>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container maxW='5xl' flex={1}>
        {children}
      </Container>
      <Box as="footer" bg={footerBgColor}>
        <Container maxW='5xl'>
          <Flex py="10" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Flex justifyContent={'center'}>
              <FooterContainer title='General'>
                <FooterLink link='/members' name='Members' type='general'/>
                <FooterLink link='/teams' name='Teams' type='general'/>
                <FooterLink link='/events' name='Events' type='general'/>
              </FooterContainer>
              <FooterContainer title='Follow Us'>
                <FooterLink link='https://github.com/hcp-uw' name='GitHub' type='follow'/>
                <FooterLink link='https://www.instagram.com/hcp.uw' name='Instagram' type='follow'/>
                <FooterLink link='https://www.linkedin.com/company/hcp-uw/mycompany/' name='LinkedIn' type='follow'/>
              </FooterContainer>
              <FooterContainer title='Contact Us'>
                <FooterLink link='meow@gmail.com' name='meow@gmail.com' type='contact'/>
              </FooterContainer>
              {/* <Button
                onClick={toggleExpand}
                variant="link"
                fontWeight="bold"
                rightIcon={<FaChevronRight />}
                transform={isExpanded ? "scaleY(1.01)" : "none"}
                transition="transform 0.3s"
              >
                Connect with us
              </Button> */}
              {/* <AnimatePresence>
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
              </AnimatePresence> */}
            </Flex>
            <Text>&copy; {new Date().getFullYear()} Husky Coding Project. All rights reserved.</Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}