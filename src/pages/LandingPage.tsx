import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import PurpleButton from '../components/PurpleButton';
import { Link } from 'react-router-dom';
import HuskyLaptop from '../assets/HCP-husky-laptop.png';
import Computer from '../assets/HCP-computer.png';
import Window from '../components/Window';
import { AnimatedTerminal } from '../components/AnimatedTerminal';

const LandingPage = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={12}
        alignItems="center"
        mt={{ base: 0, lg: '212px' }}
      >
        {/* Left side */}
        <GridItem
          order={{ base: 2, lg: 1 }}
          justifySelf={{ base: 'center', lg: 'start' }}
          w={{ base: '90%', md: '500px', lg: '100%' }}
        >
          <Text
            fontFamily="Space Mono, monospace"
            fontSize="12px"
            textTransform="uppercase"
            color="palette.darkPurple"
            mb="5px"
          >
            What is HCP?
          </Text>
          <Heading fontSize={{ base: '36px', lg: '48px' }} mb="24px">
            Your launchpad for tech teamwork @ the UW.
          </Heading>
          <Text fontSize="18px" mb={{ base: '30px', lg: '44px' }}>
            Husky Coding Project is a student organization at University of
            Washington that aims to provide a space for students, regardless of
            major or background, to gain group project work experience within
            the tech field.
          </Text>
          {/* TODO: Update link */}
          <Link to="/">
            <Box mb="77px">
              <PurpleButton text="Join Us" />
            </Box>
          </Link>
        </GridItem>

        {/* Right side */}
        <GridItem
          order={{ base: 1, lg: 2 }}
          position="relative"
          w={{ base: '100%', lg: '550px' }}
          h={{ lg: '460px' }}
          justifySelf="end"
        >
          <Window
            title=""
            w="530px"
            h="350px"
            position="absolute"
            top="38px"
            left="35px"
            display={{ base: 'none', lg: 'block' }}
          />
          <Window
            title="Husky Coding Project"
            w="530px"
            h="350px"
            position="absolute"
            zIndex={2}
            display={{ base: 'none', lg: 'block' }}
          >
            <Box p={4}>
              <AnimatedTerminal />
            </Box>
          </Window>
          <Image
            src={HuskyLaptop}
            alt="Animated husky typing on laptop"
            position={{ base: 'relative', lg: 'absolute' }}
            top={{ lg: '240px' }}
            left={{ lg: '160px' }}
            w={{ base: '80%', md: '350px' }}
            mx="auto"
            transform="rotate(3deg)"
            zIndex={3}
          />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        alignItems="center"
        mt={{ base: 0, lg: '175px' }}
      >
        {/* Left side */}
        <GridItem
          w={{ base: '90%', md: '500px', lg: '100%' }}
          mx="auto"
          display="grid"
        >
          <Box order={{ base: 2, lg: 1 }}>
            <Window title="To solve this" left={{ lg: '20px' }} mb="22px">
              <Box
                px={{ base: '32px', lg: '60px' }}
                py={{ base: '24px', lg: '40px' }}
              >
                <Heading fontSize={{ base: '28px', lg: '32px' }} mb="16px">
                  The Problem
                </Heading>
                <Text fontSize="18px" mb="12px">
                  <b>“We&apos;re looking for someone with experience.”</b>
                </Text>
                <Text fontSize="18px" mb="12px">
                  Getting internships is a great way to gain real world
                  experience on the job. However, it&apos;s difficult for us to
                  obtain without having some prior experience.
                </Text>
                <Text fontSize="18px" mb="12px">
                  <b>“Assignments and projects will be individual work.”</b>
                </Text>
                <Text fontSize="18px" mb="12px">
                  The majority of university assigned work are solo or in pairs,
                  so we miss out on the invaluable experience of working in
                  larger teams.
                </Text>
              </Box>
            </Window>
          </Box>
          <Box
            position="relative"
            height={{ lg: '260px' }}
            order={{ base: 1, lg: 2 }}
          >
            <Image
              src={Computer}
              alt="Animated old fashioned computer"
              position={{ base: 'relative', lg: 'absolute' }}
              bottom={{ lg: '0px' }}
              right={{ lg: '-10px' }}
              w={{ base: '70%', md: '336px' }}
              mx="auto"
              zIndex={1}
              mb={{ base: '77px', lg: 0 }}
            />
          </Box>
        </GridItem>

        {/* Right side */}
        <GridItem
          w={{ base: '90%', md: '500px', lg: '100%' }}
          h="100%"
          position="relative"
          mx="auto"
        >
          <Window
            title="We do this"
            w={{ base: '100%', md: '500px', lg: '100%' }}
            position={{ base: 'relative', lg: 'absolute' }}
            left={{ lg: '-20px' }}
            top={{ lg: '106px' }}
          >
            <Box
              px={{ base: '32px', lg: '60px' }}
              py={{ base: '24px', lg: '40px' }}
            >
              <Heading fontSize={{ base: '28px', lg: '32px' }} mb="16px">
                The Mission.
              </Heading>
              <Text fontSize="18px" mb="12px">
                Our mission is to create a{' '}
                <b>tech internship-like environment</b> that promotes the growth
                and development of our club members.
              </Text>
              <Text fontSize="18px" mb="12px">
                We provide <b>team-based</b> programming project experience and
                encourage peer-to-peer learning to provide the next generation
                of programmers, designers, and managers with the tools and
                experience to succeed in their future careers.
              </Text>
            </Box>
          </Window>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default LandingPage;
