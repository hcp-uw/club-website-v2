import { VStack, Text, useColorModeValue } from '@chakra-ui/react';

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const EventDate = ({ date }: { date: Date }) => {
  const dateColor = useColorModeValue('gray.700', 'gray.100');
  const monthColor = useColorModeValue('purple.600', 'purple.400');

  return (
    <VStack gap="0" align="center">
      <Text color={monthColor} fontSize="sm" fontWeight="bold">
        {monthNames[date.getMonth()]}
      </Text>
      <Text color={dateColor} fontSize="2xl" fontWeight="bold" lineHeight="0.9">
        {date.getDate()}
      </Text>
    </VStack>
  );
};

export default EventDate;
