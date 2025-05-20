import { Spinner, VStack } from '@chakra-ui/react';

const Loading = () => {
  return (
    <VStack flex="1" justify="center" align="center">
      <Spinner size="xl" />
    </VStack>
  );
};

export default Loading;
