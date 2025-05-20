import { Heading, Text, VStack } from '@chakra-ui/react';

const Error = ({ message }: { message: string }) => {
  return (
    <VStack flex="1" justify="center" align="center">
      <Heading fontSize="2xl">Something went wrong.</Heading>
      <Text color="red.500">{message}</Text>
    </VStack>
  );
};

export default Error;
