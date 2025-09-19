import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import PurpleButton from '../components/PurpleButton';
import { Link } from 'react-router-dom';
import HuskyLaptop from '../assets/HCP-husky-laptop.png';
import Window from '../components/Window';
import { AnimatedTerminal } from '../components/AnimatedTerminal';

const LandingPage = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={12}
        alignItems="center"
        w="100%"
        mt={{ base: 0, lg: '212px' }}
        h={{ base: '100%', lg: '500px' }}
      >
        {/* Left side */}
        <GridItem
          order={{ base: 2, lg: 1 }}
          h="100%"
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
            <Box>
              <PurpleButton text="Join Us" />
            </Box>
          </Link>
        </GridItem>

        {/* Right side */}
        <GridItem
          order={{ base: 1, lg: 2 }}
          position="relative"
          w={{ base: '100%', lg: '550px' }}
          h="100%"
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
            mx={{ base: 'auto', lg: 0 }}
            transform="rotate(3deg)"
            zIndex={3}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default LandingPage;
