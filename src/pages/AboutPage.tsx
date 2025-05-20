import { Box, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { AnimatedTerminal } from '../components/AnimatedTerminal'; // Make sure to import the AnimatedTerminal component

export const AboutPage: React.FC = () => {
  return (
    <Grid templateColumns={['1fr', '1fr', '2fr 1fr']} gap={6}>
      <Helmet>
        <title>Husky Coding Project</title>
        <meta
          name="description"
          content="Learn about the Husky Coding Project's mission to provide real-world, team-based programming experience and bridge the gap for aspiring software developers."
        />
      </Helmet>
      <GridItem>
        <Text
          fontSize={['3xl', '4xl', '5xl', '6xl']}
          fontWeight="semibold"
          marginTop="1em"
        >
          The Problem
        </Text>
        <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
          The majority of projects offered by CS coursework are solo or in
          pairs, so future programmers miss out on the invaluable experience of
          working in larger teams. Additionally, the leading motivation to do CS
          class projects are for grades, rather than for the learning
          experience.
        </Text>

        <Flex direction="column" width={'100%'} marginTop={'3em'}>
          <Text fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="semibold">
            The Why
          </Text>

          <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
            Getting internships is the best ways to gain real world experience
            on the job. However, it is also quite difficult to obtain without
            having some prior experience.
          </Text>
          <Text fontSize={['md', 'xl', '2xl']} marginTop="1em">
            This circular logic plagues every generation of programmers.
          </Text>
        </Flex>

        <Flex direction="column" width={'100%'} marginTop={'3em'}>
          <Text fontSize={['3xl', '4xl', '5xl', '6xl']} fontWeight="semibold">
            Our Mission
          </Text>
          <Box marginBottom={'3em'}>
            <Text
              fontSize={['md', 'xl', '2xl']}
              display="inline"
              marginTop="1em"
            >
              To create a tech internship-like environment that promotes the
              growth and development of our club members. We provide team-based
              programming project experience and encourage
            </Text>
            <Text
              fontSize={['md', 'xl', '2xl']}
              display="inline"
              color="brand.pink"
            >
              {} peer-to-peer learning
            </Text>
            <Text fontSize={['md', 'xl', '2xl']} display="inline">
              {} to provide the next generation of programmers & designers with
              the tools and experience to
            </Text>
            <Text
              fontSize={['md', 'xl', '2xl']}
              display="inline"
              color="brand.pink"
            >
              {} succeed in future tech careers.
            </Text>
          </Box>
        </Flex>
      </GridItem>

      <GridItem>
        <Box position="sticky" top="20px">
          <AnimatedTerminal />
        </Box>
      </GridItem>
    </Grid>
  );
};
