import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { TeamCard } from '../components/TeamCard';
import { teamService } from '../service/teamService';
import { InstagramEmbed } from 'react-social-media-embed';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import Error from '../components/Error';

type TeamData = { teamId: bigint; name: string; logo: string };

export const ProjectTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [slidesToShow, setSlidesToShow] = useState(3);

  const defaultLogoUrl =
    'https://wivolixjgzmaigovvchs.supabase.co/storage/v1/object/public/club-website-assets/Teams/default.png';

  const updateSlidesToShow = () => {
    if (window.innerWidth < 640) {
      setSlidesToShow(1);
    } else if (window.innerWidth < 1024) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const instagramPosts = [
    'https://www.instagram.com/p/DGetPdiJqgx/?img_index=1',
    'https://www.instagram.com/p/DF7IDobx8Mz/?img_index=1',
    'https://www.instagram.com/p/C7NRaFXPMIu/?img_index=1',
    'https://www.instagram.com/p/C6o8KaYS5WS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    'https://www.instagram.com/p/C0fZpMEPXKj/?img_index=1',
    'https://www.instagram.com/p/DCkoN2LSqtw/?img_index=1',
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamService.getAllTeams();
        const validTeams = fetchedTeams.filter(
          (team) => team.teamId !== undefined
        ) as TeamData[];
        setTeams(validTeams);
        setFilteredTeams(validTeams);
      } catch (err) {
        console.error('Team Fetch Error:', err);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  const showcaseTeams = filteredTeams.filter(
    (team) => team.logo !== defaultLogoUrl
  );
  const otherTeams = filteredTeams.filter(
    (team) => team.logo === defaultLogoUrl
  );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const showcaseHeaderStyle = {
    bgGradient: 'linear(to-r, purple.500, blue.400)', // Remove this to disable gradient
    color: 'white',
    px: 4,
    py: 2,
    borderRadius: 'md',
    width: 'fit-content',
  };

  return (
    <VStack spacing={8} align="stretch">
      <Helmet>
        <title>Projects</title>
        <meta
          name="description"
          content="Explore the innovative project teams at Husky Coding Project. Discover how our talented developers, designers, and engineers collaborate to build real-world software solutions, drive technical innovation, and create impact at the University of Washington and beyond."
        />
      </Helmet>

      <Heading>Featured Projects</Heading>
      <div className="w-full flex justify-center sm:max-w-7xl mx-auto items-center">
        <Slider {...settings} className="w-full flex justify-center mx-auto">
          {instagramPosts.map((post, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4 w-full"
            >
              <div className="flex justify-center w-full">
                <InstagramEmbed url={post} width={328} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Heading>Teams</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {showcaseTeams.length > 0 && (
        <>
          <Box mt={10} mb={2}>
            <Box {...showcaseHeaderStyle}>
              <Heading size="md">Showcase 2025</Heading>
            </Box>
          </Box>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {showcaseTeams.map((team) => (
              <TeamCard key={team.teamId.toString()} team={team} />
            ))}
          </SimpleGrid>
        </>
      )}

      {otherTeams.length > 0 && (
        <>
          <Divider mt={12} mb={4} />
          <Heading size="md" mb={2}>
            All Teams
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {otherTeams.map((team) => (
              <TeamCard key={team.teamId.toString()} team={team} />
            ))}
          </SimpleGrid>
        </>
      )}
    </VStack>
  );
};
