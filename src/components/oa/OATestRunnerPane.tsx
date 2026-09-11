import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  HStack,
  VStack,
  Textarea,
  Code,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { OAProblem, OATestResult } from '../../interfaces/IOA';
import { FaCheckCircle, FaTimesCircle, FaTerminal, FaChevronDown, FaChevronUp, FaExclamationTriangle } from 'react-icons/fa';

interface OATestRunnerPaneProps {
  problem: OAProblem;
  testResults: OATestResult[] | null;
  isRunning: boolean;
  customInput: string;
  onCustomInputChange: (val: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const OATestRunnerPane: React.FC<OATestRunnerPaneProps> = ({
  problem,
  testResults,
  isRunning,
  customInput,
  onCustomInputChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);

  const passedCount = testResults ? testResults.filter(r => r.passed).length : 0;
  const totalCount = testResults ? testResults.length : 0;
  const allPassed = testResults && totalCount > 0 && passedCount === totalCount;
  const currentResult = testResults && testResults[selectedCaseIdx] ? testResults[selectedCaseIdx] : null;

  return (
    <Box
      bg="#181825"
      borderTop="2px solid #313244"
      color="#cdd6f4"
      display="flex"
      flexDirection="column"
      h={isCollapsed ? '40px' : '270px'}
      transition="height 0.3s ease"
      overflow="hidden"
    >
      {/* Header Bar */}
      <Flex
        bg="#11111b"
        px={4}
        h="40px"
        alignItems="center"
        justifyContent="space-between"
        borderBottom={isCollapsed ? 'none' : '1px solid #313244'}
      >
        <HStack spacing={3}>
          <FaTerminal color="#cba6f7" size="14px" />
          <Text fontSize="xs" fontWeight="bold" color="white">
            TESTCASES & COMPILER OUTPUT
          </Text>

          {testResults && (
            <Badge
              colorScheme={allPassed ? 'green' : currentResult?.error ? 'red' : 'amber'}
              fontSize="11px"
              px={2.5}
              py={0.5}
              borderRadius="full"
            >
              {allPassed
                ? '✓ ALL TESTCASES PASSED'
                : currentResult?.error
                ? '⚡ RUNTIME / COMPILATION ERROR'
                : `RESULTS (${passedCount}/${totalCount} PASSED)`}
            </Badge>
          )}

          {isRunning && (
            <Badge colorScheme="purple" fontSize="10px" className="animate-pulse">
              EVALUATING CODE...
            </Badge>
          )}
        </HStack>

        <Tooltip label={isCollapsed ? 'Expand Test Panel' : 'Collapse Test Panel'}>
          <IconButton
            aria-label="Toggle Panel"
            icon={isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
            size="xs"
            variant="ghost"
            color="#a6adc8"
            _hover={{ bg: 'whiteAlpha.100' }}
            onClick={onToggleCollapse}
          />
        </Tooltip>
      </Flex>

      {!isCollapsed && (
        <Flex flex="1" overflow="hidden">
          <Tabs variant="line" colorScheme="purple" flex="1" display="flex" flexDirection="column">
            <TabList bg="#181825" borderColor="#313244" px={3}>
              <Tab fontSize="xs" color="#a6adc8" _selected={{ color: '#cba6f7', fontWeight: 'bold' }}>
                Test Cases
              </Tab>
              <Tab fontSize="xs" color="#a6adc8" _selected={{ color: '#cba6f7', fontWeight: 'bold' }}>
                Custom Input
              </Tab>
              {testResults && (
                <Tab fontSize="xs" color="#a6adc8" _selected={{ color: '#cba6f7', fontWeight: 'bold' }}>
                  Compiler Log & Details
                </Tab>
              )}
            </TabList>

            <TabPanels flex="1" overflowY="auto" p={3}>
              {/* Tab 1: Test Cases */}
              <TabPanel p={0}>
                <VStack align="stretch" spacing={3}>
                  <HStack spacing={2}>
                    {problem.sampleTestCases.map((tc, idx) => {
                      const res = testResults ? testResults.find(r => r.testCaseId === tc.id) : null;
                      return (
                        <Box
                          key={tc.id}
                          px={3}
                          py={1.5}
                          borderRadius="md"
                          cursor="pointer"
                          bg={selectedCaseIdx === idx ? '#422f7e' : '#1e1e2e'}
                          border="1px solid"
                          borderColor={selectedCaseIdx === idx ? '#7C3AED' : '#313244'}
                          onClick={() => setSelectedCaseIdx(idx)}
                        >
                          <HStack spacing={1.5}>
                            {res && (
                              res.passed ? (
                                <FaCheckCircle color="#a6e3a1" size="11px" />
                              ) : (
                                <FaTimesCircle color="#f38ba8" size="11px" />
                              )
                            )}
                            <Text fontSize="xs" fontWeight="semibold" color="white">
                              Case {idx}
                            </Text>
                          </HStack>
                        </Box>
                      );
                    })}
                  </HStack>

                  {/* Selected Testcase Details */}
                  {problem.sampleTestCases[selectedCaseIdx] && (
                    <Box bg="#1e1e2e" p={3} borderRadius="md" border="1px solid #313244">
                      {/* LEETCODE-STYLE RUNTIME ERROR ALERT DISPLAY */}
                      {currentResult?.error && (
                        <Box bg="#2a151e" borderColor="#f38ba8" borderWidth="1px" p={3} borderRadius="md" mb={3}>
                          <Flex align="center" gap={2} mb={1}>
                            <FaExclamationTriangle color="#f38ba8" size="14px" />
                            <Text fontSize="xs" fontWeight="bold" color="#f38ba8">
                              Runtime / Compiler Error:
                            </Text>
                          </Flex>
                          <Code
                            display="block"
                            p={2}
                            bg="#11111b"
                            color="#f38ba8"
                            fontSize="xs"
                            fontFamily="Space Mono, monospace"
                            whiteSpace="pre-wrap"
                            borderRadius="sm"
                          >
                            {currentResult.error}
                          </Code>
                        </Box>
                      )}

                      <Text fontSize="xs" fontWeight="bold" color="purple.300" mb={1}>
                        Input
                      </Text>
                      <Code display="block" p={2} bg="#11111b" color="#a6e3a1" fontSize="xs" borderRadius="md" mb={2}>
                        {problem.sampleTestCases[selectedCaseIdx].input}
                      </Code>

                      <Flex gap={4}>
                        <Box flex="1">
                          <Text fontSize="xs" fontWeight="bold" color="purple.300" mb={1}>
                            Expected Output
                          </Text>
                          <Code display="block" p={2} bg="#11111b" color="#f9e2af" fontSize="xs" borderRadius="md">
                            {problem.sampleTestCases[selectedCaseIdx].expectedOutput}
                          </Code>
                        </Box>

                        {currentResult && (
                          <Box flex="1">
                            <Text fontSize="xs" fontWeight="bold" color="purple.300" mb={1}>
                              Your Output
                            </Text>
                            <Code
                              display="block"
                              p={2}
                              bg="#11111b"
                              color={currentResult.passed ? '#a6e3a1' : '#f38ba8'}
                              fontSize="xs"
                              borderRadius="md"
                            >
                              {currentResult.actualOutput}
                            </Code>
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  )}
                </VStack>
              </TabPanel>

              {/* Tab 2: Custom Input */}
              <TabPanel p={0}>
                <VStack align="stretch" spacing={2}>
                  <Text fontSize="xs" color="#a6adc8">
                    Enter custom argument values to test your code against:
                  </Text>
                  <Textarea
                    value={customInput}
                    onChange={e => onCustomInputChange(e.target.value)}
                    placeholder="e.g. nums = [1, 2, 3], target = 4"
                    bg="#11111b"
                    borderColor="#313244"
                    color="#cdd6f4"
                    fontFamily="Space Mono, monospace"
                    fontSize="xs"
                    rows={4}
                    _focus={{ borderColor: 'purple.400' }}
                  />
                </VStack>
              </TabPanel>

              {/* Tab 3: Execution Details */}
              {testResults && (
                <TabPanel p={0}>
                  <VStack align="stretch" spacing={2}>
                    <Flex justify="space-between" bg="#1e1e2e" p={3} borderRadius="md">
                      <Box>
                        <Text fontSize="xs" color="#a6adc8">Test Suite Status</Text>
                        <Text fontSize="sm" fontWeight="bold" color={allPassed ? 'green.300' : 'red.300'}>
                          {allPassed ? 'Passed All Tests' : 'Tests Failed'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="#a6adc8">Avg Execution Time</Text>
                        <Text fontSize="sm" fontWeight="bold" color="purple.200">
                          {Math.round(testResults.reduce((acc, r) => acc + r.executionTimeMs, 0) / testResults.length)} ms
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="#a6adc8">Peak Memory</Text>
                        <Text fontSize="sm" fontWeight="bold" color="purple.200">
                          14.2 MB
                        </Text>
                      </Box>
                    </Flex>

                    {currentResult?.error && (
                      <Box bg="#2a151e" p={3} borderRadius="md">
                        <Text fontSize="xs" fontWeight="bold" color="#f38ba8" mb={1}>
                          Compiler / Stack Trace:
                        </Text>
                        <Code display="block" p={2} bg="#11111b" color="#f38ba8" fontSize="xs" whiteSpace="pre-wrap">
                          {currentResult.error}
                        </Code>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Flex>
      )}
    </Box>
  );
};
