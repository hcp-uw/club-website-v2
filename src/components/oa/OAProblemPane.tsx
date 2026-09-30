import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
  Flex,
  useToast,
  Divider,
  Code,
} from '@chakra-ui/react';
import { OAProblem, OASubmission, ProctoringEvent } from '../../interfaces/IOA';
import { FaCopy, FaCheck, FaExclamationCircle, FaShieldAlt } from 'react-icons/fa';

interface OAProblemPaneProps {
  problem: OAProblem;
  submissions: OASubmission[];
  proctoringEvents: ProctoringEvent[];
}

export const OAProblemPane: React.FC<OAProblemPaneProps> = ({
  problem,
  submissions,
  proctoringEvents,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const toast = useToast();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: 'Copied to clipboard',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'bottom-left',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'amber';
      case 'Hard':
        return 'red';
      default:
        return 'purple';
    }
  };

  const problemSubmissions = submissions.filter(s => s.problemId === problem.id);

  return (
    <Box h="100%" bg="#181825" color="#cdd6f4" display="flex" flexDirection="column" overflow="hidden">
      <Tabs variant="line" colorScheme="purple" flex="1" display="flex" flexDirection="column">
        {/* Tab Navigation Bar */}
        <TabList bg="#11111b" borderColor="#313244" px={4} pt={2}>
          <Tab
            _selected={{ color: '#cba6f7', borderColor: '#cba6f7', fontWeight: 'bold' }}
            color="#a6adc8"
            fontSize="sm"
          >
            Problem Description
          </Tab>
          <Tab
            _selected={{ color: '#cba6f7', borderColor: '#cba6f7', fontWeight: 'bold' }}
            color="#a6adc8"
            fontSize="sm"
          >
            Submissions ({problemSubmissions.length})
          </Tab>
          <Tab
            _selected={{ color: '#cba6f7', borderColor: '#cba6f7', fontWeight: 'bold' }}
            color="#a6adc8"
            fontSize="sm"
          >
            <HStack spacing={1}>
              <FaShieldAlt size="11px" />
              <Text>Proctoring Audit ({proctoringEvents.length})</Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels flex="1" overflowY="auto" p={0}>
          {/* Panel 1: Problem Description */}
          <TabPanel p={6}>
            <VStack align="stretch" spacing={5}>
              {/* Problem Header & Tags */}
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="white" mb={2}>
                  {problem.title}
                </Text>

                <HStack spacing={2} wrap="wrap">
                  <Badge colorScheme={getDifficultyColor(problem.difficulty)} fontSize="xs" px={2.5} py={0.5} borderRadius="full">
                    {problem.difficulty}
                  </Badge>
                  <Badge colorScheme="purple" fontSize="xs" px={2.5} py={0.5} borderRadius="full">
                    {problem.category}
                  </Badge>
                  <Badge variant="outline" colorScheme="purple" fontSize="xs" px={2.5} py={0.5} borderRadius="full">
                    Score: {problem.score} pts
                  </Badge>
                </HStack>
              </Box>

              <Divider borderColor="#313244" />

              {/* Main Problem Text */}
              <Box fontSize="sm" lineHeight="1.7" color="#bac2de">
                <Text whiteSpace="pre-line">{problem.description}</Text>
              </Box>

              {/* Input Format */}
              <Box>
                <Text fontSize="md" fontWeight="bold" color="white" mb={1}>
                  Input Format
                </Text>
                <Text fontSize="sm" color="#a6adc8">
                  {problem.inputFormat}
                </Text>
              </Box>

              {/* Constraints */}
              <Box bg="#1e1e2e" p={3} borderRadius="md" borderLeft="4px solid #422f7e">
                <Text fontSize="sm" fontWeight="bold" color="purple.300" mb={1}>
                  Constraints
                </Text>
                <Text fontSize="xs" fontFamily="Space Mono, monospace" color="#cdd6f4" whiteSpace="pre-line">
                  {problem.constraints}
                </Text>
              </Box>

              {/* Output Format */}
              <Box>
                <Text fontSize="md" fontWeight="bold" color="white" mb={1}>
                  Output Format
                </Text>
                <Text fontSize="sm" color="#a6adc8">
                  {problem.outputFormat}
                </Text>
              </Box>

              <Divider borderColor="#313244" />

              {/* Sample Test Cases */}
              <Text fontSize="lg" fontWeight="bold" color="white">
                Sample Test Cases
              </Text>

              {problem.sampleTestCases.map((tc, idx) => (
                <Box key={tc.id} bg="#1e1e2e" p={4} borderRadius="lg" border="1px solid #313244">
                  <Text fontSize="sm" fontWeight="bold" color="purple.300" mb={2}>
                    Sample Input {idx}
                  </Text>
                  <Flex justify="space-between" align="center" bg="#11111b" p={3} borderRadius="md" mb={3}>
                    <Code bg="transparent" color="#a6e3a1" fontFamily="Space Mono, monospace" fontSize="xs">
                      {tc.input}
                    </Code>
                    <Button
                      size="xs"
                      variant="ghost"
                      color="purple.300"
                      leftIcon={copiedId === `in-${tc.id}` ? <FaCheck /> : <FaCopy />}
                      onClick={() => handleCopy(tc.input, `in-${tc.id}`)}
                    >
                      Copy
                    </Button>
                  </Flex>

                  <Text fontSize="sm" fontWeight="bold" color="purple.300" mb={2}>
                    Sample Output {idx}
                  </Text>
                  <Box bg="#11111b" p={3} borderRadius="md" mb={3}>
                    <Code bg="transparent" color="#f9e2af" fontFamily="Space Mono, monospace" fontSize="xs">
                      {tc.expectedOutput}
                    </Code>
                  </Box>

                  {tc.explanation && (
                    <Box mt={2}>
                      <Text fontSize="xs" fontWeight="bold" color="#a6adc8">
                        Explanation:
                      </Text>
                      <Text fontSize="xs" color="#bac2de">
                        {tc.explanation}
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          </TabPanel>

          {/* Panel 2: Submissions */}
          <TabPanel p={6}>
            {problemSubmissions.length === 0 ? (
              <VStack py={10} spacing={3} color="#6c7086">
                <FaExclamationCircle size="28px" />
                <Text fontSize="sm">No submissions recorded for this problem yet.</Text>
              </VStack>
            ) : (
              <VStack align="stretch" spacing={3}>
                {problemSubmissions.map(sub => (
                  <Box key={sub.id} bg="#1e1e2e" p={4} borderRadius="lg" border="1px solid #313244">
                    <Flex justify="space-between" align="center" mb={2}>
                      <HStack spacing={2}>
                        <Badge
                          colorScheme={sub.status === 'Accepted' ? 'green' : 'red'}
                          fontSize="xs"
                          px={2.5}
                          py={0.5}
                          borderRadius="full"
                        >
                          {sub.status}
                        </Badge>
                        <Text fontSize="xs" color="#a6adc8">
                          {sub.language.toUpperCase()}
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="#6c7086">
                        {sub.timestamp}
                      </Text>
                    </Flex>
                    <Text fontSize="xs" color="#cdd6f4">
                      Passed Test Cases: {sub.passCount} / {sub.totalCount}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </TabPanel>

          {/* Panel 3: Proctoring Audit */}
          <TabPanel p={6}>
            <Box bg="#1e1e2e" p={4} borderRadius="lg" border="1px solid #313244" mb={4}>
              <Text fontSize="sm" fontWeight="bold" color="purple.300" mb={1}>
                Proctoring Event Monitor
              </Text>
              <Text fontSize="xs" color="#a6adc8">
                All camera events, screen sharing status, tab switches, and window blur events are logged automatically.
              </Text>
            </Box>

            <VStack align="stretch" spacing={2}>
              {proctoringEvents.map(evt => (
                <Flex
                  key={evt.id}
                  p={2.5}
                  bg="#11111b"
                  borderRadius="md"
                  align="center"
                  justify="space-between"
                  borderLeft="3px solid"
                  borderLeftColor={
                    evt.type === 'TAB_SWITCH' || evt.type === 'WINDOW_BLUR'
                      ? 'red.400'
                      : 'purple.400'
                  }
                >
                  <HStack spacing={3}>
                    <Badge
                      colorScheme={
                        evt.type === 'TAB_SWITCH' || evt.type === 'WINDOW_BLUR'
                          ? 'red'
                          : 'purple'
                      }
                      fontSize="10px"
                    >
                      {evt.type}
                    </Badge>
                    <Text fontSize="xs" color="#cdd6f4">
                      {evt.description}
                    </Text>
                  </HStack>
                  <Text fontSize="10px" color="#6c7086" fontFamily="Space Mono, monospace">
                    {evt.timestamp}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
