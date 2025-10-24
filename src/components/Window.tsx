import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WindowProps {
  title?: string;
  children?: ReactNode;
  [key: string]: any;
}

const Window: React.FC<WindowProps> = ({ title, children, ...props }) => {
  return (
    <Box
      borderWidth="2px"
      borderColor="black"
      borderRadius="10px"
      overflow="hidden"
      bg="white"
      {...props}
    >
      {/* Window Header */}
      <Flex
        align="center"
        justify="space-between"
        pl="16px"
        pr="12px"
        py="8px"
        bg="white"
        borderBottom="2px"
        borderColor="black"
      >
        <Text
          fontSize="12px"
          fontFamily="Space Mono, monospace"
          color="palette.darkPurple"
          casing="uppercase"
        >
          {title}
        </Text>
        <Flex gap="14px" align="center">
          {/* Minimize*/}
          <Box w="15px" h="0px" borderWidth="1px" borderColor="black" />

          {/* Maximize */}
          <Box w="14px" h="13px" border="2px" borderColor="black" />

          {/* Close */}
          <Box w="14px" h="13px" position="relative">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              w="17px"
              h="1.5px"
              bg="black"
              transform="translate(-50%, -50%) rotate(42deg)"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              w="17px"
              h="1.5px"
              bg="black"
              transform="translate(-50%, -50%) rotate(-42deg)"
            />
          </Box>
        </Flex>
      </Flex>

      {/* Window Body */}
      {children}
    </Box>
  );
};

export default Window;
