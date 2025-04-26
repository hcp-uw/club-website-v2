import { VStack, Text } from '@chakra-ui/react';

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
  return (
    <VStack gap="0" align="center">
      <Text color="purple.600" fontSize="sm" fontWeight="bold">
        {monthNames[date.getMonth()]}
      </Text>
      <Text color="gray.700" fontSize="2xl" fontWeight="bold" lineHeight="0.9">
        {date.getDate()}
      </Text>
    </VStack>
  );
};

export default EventDate;
