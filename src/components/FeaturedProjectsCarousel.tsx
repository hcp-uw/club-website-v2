import React, { useMemo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box } from '@chakra-ui/react';
import { InstagramEmbed } from 'react-social-media-embed';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const instagramPosts = [
  'https://www.instagram.com/p/DGetPdiJqgx/?img_index=1',
  'https://www.instagram.com/p/DF7IDobx8Mz/?img_index=1',
  'https://www.instagram.com/p/C7NRaFXPMIu/?img_index=1',
  'https://www.instagram.com/p/C6o8KaYS5WS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/C0fZpMEPXKj/?img_index=1',
  'https://www.instagram.com/p/DCkoN2LSqtw/?img_index=1',
];

const FeaturedProjectsCarousel: React.FC = () => {
  const [vw, setVw] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const settings = useMemo(
    () => ({
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 1120,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    }),
    []
  );

  const embedWidth = 328;

  return (
    <Box
      width="100%"
      maxW="1800px"
      mx="auto"
      overflow="hidden"
      sx={{
        '.slick-slider': {
          paddingLeft: { base: '1rem', md: '2rem', lg: '3rem' },
          paddingRight: { base: '1rem', md: '2rem', lg: '3rem' },
        },
        '.slick-slide': {
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          display: 'flex !important',
          justifyContent: 'center',
        },
        '.slick-dots': {
          bottom: '-30px',
          'li button::before': {
            fontSize: '8px',
          },
        },
        '.slick-prev': {
          left: { base: '15px', md: '30px' },
          zIndex: 1,
        },
        '.slick-next': {
          right: { base: '15px', md: '30px' },
          zIndex: 1,
        },
      }}
    >
      <Slider {...settings}>
        {instagramPosts.map((post, index) => (
          <Box key={index} display="flex" justifyContent="center">
            <InstagramEmbed url={post} width={embedWidth} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default FeaturedProjectsCarousel;
