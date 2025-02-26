import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Heading,
  Spinner,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TeamCard } from "../components/TeamCard";
import { teamService } from "../service/teamService";
import { ITeam } from "../interfaces/ITeam";
import { Layout } from "../components/Layout";
import { InstagramEmbed } from "react-social-media-embed";

// Import React Slick for Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ProjectTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State to track screen width
  const [slidesToShow, setSlidesToShow] = useState(3);

  const updateSlidesToShow = () => {
    if (window.innerWidth < 768) {
      setSlidesToShow(1);
    } else {
      setSlidesToShow(3);
    }
  };

  // Effect to update state when window resizes
  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // Instagram Post URLs
  const instagramPosts = [
    "https://www.instagram.com/p/DGetPdiJqgx/?img_index=1",
    "https://www.instagram.com/p/DF7IDobx8Mz/?img_index=1",
    "https://www.instagram.com/p/DF7JIEyPlxx/?img_index=1",
    "https://www.instagram.com/p/DF7KPH7IzFc/?img_index=1",
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await teamService.getAllTeams();
        setTeams(fetchedTeams);
        setFilteredTeams(fetchedTeams);
      } catch (err) {
        setError("Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter((team) =>
      team.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  if (loading)
    return (
      <Layout>
        <Spinner size="xl" />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Text color="red.500">{error}</Text>
      </Layout>
    );

  // Slider Settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: slidesToShow, // Now dynamically updating based on window width
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Heading>Featured Instagram Posts</Heading>

        {/* Instagram Carousel */}
        <div className="w-full flex justify-center sm:max-w-7xl mx-auto items-center">
          <Slider {...settings} className="w-full">
            {instagramPosts.map((post, index) => (
              <div key={index} className="flex justify-center items-center p-4">
                <InstagramEmbed url={post} width={328} />
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
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {filteredTeams.map((team) => (
            <TeamCard key={team.teamId?.toString()} team={team} />
          ))}
        </SimpleGrid>
      </VStack>
    </Layout>
  );
};
