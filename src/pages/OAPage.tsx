import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  useToast,
  Divider,
  Container,
  Heading,
  useDisclosure,
  Code,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import {
  OAAccessCode,
  OALanguage,
  OASubmission,
  OATestResult,
  ProctoringEvent,
} from '../interfaces/IOA';
import { OA_PROBLEMS } from '../data/oaProblems';
import { oaCodeService } from '../service/oaCodeService';
import { codeRunner } from '../service/codeRunner';

import { OAHeader } from '../components/oa/OAHeader';
import { OAProblemPane } from '../components/oa/OAProblemPane';
import { OACodeEditor } from '../components/oa/OACodeEditor';
import { OATestRunnerPane } from '../components/oa/OATestRunnerPane';
import { ProctoringRecorder } from '../components/oa/ProctoringRecorder';
import { OAAdminModal } from '../components/oa/OAAdminModal';

import { FaLock, FaVideo, FaDesktop, FaKey, FaShieldAlt, FaTrophy, FaDownload, FaEnvelope } from 'react-icons/fa';
import HcpLogo from '../assets/logo-with-outline-without-tags.png';

export const OAPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const { isOpen: isAdminOpen, onOpen: onOpenAdmin, onClose: onCloseAdmin } = useDisclosure();

  // Session State
  const [step, setStep] = useState<'VERIFY' | 'PERMISSIONS' | 'ASSESSMENT' | 'COMPLETED'>('VERIFY');
  const [inputCode, setInputCode] = useState<string>('');
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('');
  const [activeCodeObj, setActiveCodeObj] = useState<OAAccessCode | null>(null);

  // Assessment State
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [activeLanguage, setActiveLanguage] = useState<OALanguage>('python');
  const [codeByProblemAndLang, setCodeByProblemAndLang] = useState<
    Record<string, Record<OALanguage, string>>
  >({});
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  // Runner & Output State
  const [testResults, setTestResults] = useState<Record<string, OATestResult[]>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isTestPanelCollapsed, setIsTestPanelCollapsed] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<OASubmission[]>([]);

  // Timer & Proctoring
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3600);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [screenShareActive, setScreenShareActive] = useState<boolean>(false);
  const [proctoringEvents, setProctoringEvents] = useState<ProctoringEvent[]>([]);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null);

  const currentProblem = OA_PROBLEMS[currentProblemIndex] || OA_PROBLEMS[0];

  // Auto-fill code and email from URL query params if present (e.g. ?code=XYZ&email=alex@uw.edu)
  useEffect(() => {
    const urlCode = searchParams.get('code');
    const urlEmail = searchParams.get('email');
    if (urlCode) {
      setInputCode(urlCode.trim().toUpperCase());
    }
    if (urlEmail) {
      setCandidateEmail(urlEmail.trim().toLowerCase());
    }
  }, [searchParams]);

  // Initialize Code Templates
  useEffect(() => {
    const initialCodeMap: Record<string, Record<OALanguage, string>> = {};
    OA_PROBLEMS.forEach(p => {
      initialCodeMap[p.id] = { ...p.codeTemplates };
    });
    setCodeByProblemAndLang(initialCodeMap);
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (step !== 'ASSESSMENT') return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  // Handle Code Verification (verifies code AND candidate email pair)
  const handleVerifyCode = async () => {
    const res = await oaCodeService.validateCode(inputCode, candidateEmail);
    if (!res.valid || !res.accessCode) {
      if (res.isUsed) {
        toast({
          title: 'Code Already Used',
          description: 'This code was already completed in a previous run. Resetting code usage for testing...',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        await oaCodeService.resetCodeUsage(inputCode);
        const retryRes = await oaCodeService.validateCode(inputCode, candidateEmail);
        if (retryRes.valid && retryRes.accessCode) {
          setActiveCodeObj(retryRes.accessCode);
          setCandidateName(retryRes.accessCode.candidateName || 'Candidate');
          setCandidateEmail(retryRes.accessCode.candidateEmail);
          setTimeRemainingSeconds((retryRes.accessCode.maxDurationMinutes || 60) * 60);
          setStep('PERMISSIONS');
          return;
        }
      }

      toast({
        title: 'Access Denied',
        description: res.message || 'Invalid access code or email pair.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setActiveCodeObj(res.accessCode);
    setCandidateName(res.accessCode.candidateName || 'Candidate');
    setCandidateEmail(res.accessCode.candidateEmail);
    setTimeRemainingSeconds((res.accessCode.maxDurationMinutes || 60) * 60);

    setStep('PERMISSIONS');
  };

  // Handle Launching Assessment
  const handleStartAssessment = async () => {
    if (activeCodeObj) {
      await oaCodeService.markCodeUsed(activeCodeObj.code);
    }
    setStep('ASSESSMENT');

    logProctoringEvent({
      timestamp: new Date().toLocaleTimeString(),
      type: 'INFO',
      description: 'Candidate started online assessment.',
    });
  };

  // Helper for logging proctoring events
  const logProctoringEvent = (evt: Omit<ProctoringEvent, 'id'>) => {
    setProctoringEvents(prev => [
      {
        id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        ...evt,
      },
      ...prev,
    ]);
  };

  // Current Code in Editor
  const currentCode =
    codeByProblemAndLang[currentProblem.id]?.[activeLanguage] ||
    currentProblem.codeTemplates[activeLanguage] ||
    '';

  const handleCodeChange = (newCode: string) => {
    setCodeByProblemAndLang(prev => ({
      ...prev,
      [currentProblem.id]: {
        ...(prev[currentProblem.id] || currentProblem.codeTemplates),
        [activeLanguage]: newCode,
      },
    }));
  };

  const handleResetTemplate = () => {
    handleCodeChange(currentProblem.codeTemplates[activeLanguage]);
  };

  // Run Code against Sample Test cases
  const handleRunCode = async () => {
    setIsRunning(true);
    setIsTestPanelCollapsed(false);

    try {
      const sampleCases = currentProblem.sampleTestCases;
      const results: OATestResult[] = [];

      for (const tc of sampleCases) {
        const res = await codeRunner.runSingleTestCase(
          currentProblem,
          activeLanguage,
          currentCode,
          tc
        );
        results.push(res);
      }

      setTestResults(prev => ({
        ...prev,
        [currentProblem.id]: results,
      }));

      const passed = results.filter(r => r.passed).length;
      toast({
        title: `Ran Test Cases: ${passed}/${results.length} Passed`,
        status: passed === results.length ? 'success' : 'warning',
        duration: 2000,
      });
    } catch (err: any) {
      toast({
        title: 'Execution Error',
        description: err?.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code for Current Problem & Log to Supabase Backend
  const handleSubmitCode = async () => {
    setIsRunning(true);
    try {
      const sub = await codeRunner.runTestSuite(currentProblem, activeLanguage, currentCode);
      setSubmissions(prev => [sub, ...prev]);

      // Save submission and proctoring log to Supabase DB backend
      if (activeCodeObj) {
        await oaCodeService.saveSubmissionToBackend(
          activeCodeObj.code,
          candidateEmail,
          sub,
          proctoringEvents
        );
      }

      toast({
        title: sub.status === 'Accepted' ? 'Solution Accepted!' : `Submission: ${sub.status}`,
        description: `Passed ${sub.passCount}/${sub.totalCount} test cases. Recorded to backend database.`,
        status: sub.status === 'Accepted' ? 'success' : 'error',
        duration: 3000,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Final Test Submission
  const handleFinalSubmit = () => {
    setStep('COMPLETED');
    logProctoringEvent({
      timestamp: new Date().toLocaleTimeString(),
      type: 'INFO',
      description: 'Candidate submitted complete test session.',
    });
  };

  // Download Recording
  const handleDownloadSessionVideo = () => {
    if (!recordedVideoBlob) return;
    const url = URL.createObjectURL(recordedVideoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HCP_OA_${activeCodeObj?.code || 'Session'}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box minH="100vh" bg="#0f111a" color="#cdd6f4" fontFamily="Space Grotesk, sans-serif">
      {/* Admin Management Modal */}
      <OAAdminModal isOpen={isAdminOpen} onClose={onCloseAdmin} />

      {/* STEP 1: VERIFY ONE-TIME CODE & EMAIL */}
      {step === 'VERIFY' && (
        <Flex minH="100vh" align="center" justify="center" p={4} bg="#0f111a">
          <Container maxW="md">
            <VStack
              bg="#181825"
              p={8}
              borderRadius="2xl"
              boxShadow="0 20px 40px rgba(0,0,0,0.6)"
              border="1px solid #422f7e"
              spacing={6}
              align="stretch"
            >
              <Flex direction="column" align="center" textAlign="center" gap={2}>
                <img src={HcpLogo} alt="HCP Logo" style={{ width: '70px', height: 'auto' }} />
                <Heading size="md" color="white" mt={2}>
                  Husky Coding Project
                </Heading>
                <Badge colorScheme="purple" fontSize="xs" px={3} py={1} borderRadius="full">
                  SECRET ONLINE ASSESSMENT PORTAL
                </Badge>
              </Flex>

              <Text fontSize="xs" color="#a6adc8" textAlign="center">
                Please enter your registered candidate email and assigned one-time access code.
              </Text>

              <VStack spacing={4}>
                <Box w="100%">
                  <Text fontSize="xs" color="purple.300" mb={1} fontWeight="bold">
                    Candidate Email Address *
                  </Text>
                  <Input
                    placeholder="e.g. candidate@uw.edu"
                    value={candidateEmail}
                    onChange={e => setCandidateEmail(e.target.value)}
                    bg="#11111b"
                    borderColor="#422f7e"
                    color="white"
                    fontSize="sm"
                    _focus={{ borderColor: 'purple.400' }}
                  />
                </Box>

                <Box w="100%">
                  <Text fontSize="xs" color="purple.300" mb={1} fontWeight="bold">
                    One-Time Access Code *
                  </Text>
                  <Input
                    placeholder="e.g. HCP-OA-2026"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value.toUpperCase())}
                    bg="#11111b"
                    borderColor="#422f7e"
                    color="white"
                    fontSize="md"
                    fontFamily="Space Mono, monospace"
                    textAlign="center"
                    letterSpacing="wider"
                    _focus={{ borderColor: 'purple.400' }}
                  />
                </Box>

                <Button
                  leftIcon={<FaLock />}
                  w="100%"
                  size="lg"
                  bg="#7C3AED"
                  color="white"
                  _hover={{ bg: '#6D28D9' }}
                  onClick={handleVerifyCode}
                  mt={2}
                >
                  Authenticate & Continue
                </Button>
              </VStack>

              <Divider borderColor="#313244" />

              <VStack align="stretch" spacing={2}>
                <Text fontSize="11px" color="#6c7086">
                  Demo code: <Code color="purple.300">HCP-OA-2026</Code> (Email: <Code color="purple.300">candidate@uw.edu</Code>)
                </Text>
                <Flex justify="flex-end">
                  <Button
                    leftIcon={<FaKey />}
                    size="xs"
                    variant="ghost"
                    color="purple.400"
                    onClick={onOpenAdmin}
                  >
                    Admin Code Generator
                  </Button>
                </Flex>
              </VStack>
            </VStack>
          </Container>
        </Flex>
      )}

      {/* STEP 2: SYSTEM & PERMISSIONS CHECK */}
      {step === 'PERMISSIONS' && (
        <Flex minH="100vh" align="center" justify="center" p={4} bg="#0f111a">
          <Container maxW="lg">
            <VStack
              bg="#181825"
              p={8}
              borderRadius="2xl"
              boxShadow="0 20px 40px rgba(0,0,0,0.6)"
              border="1px solid #422f7e"
              spacing={6}
              align="stretch"
            >
              <Heading size="md" color="white" textAlign="center">
                Proctoring & System Diagnostic
              </Heading>

              <Alert status="info" borderRadius="lg" bg="#2b1d56" color="purple.100">
                <AlertIcon />
                <Text fontSize="xs">
                  Welcome <strong>{candidateName}</strong> ({candidateEmail}). This assessment requires active webcam and screen sharing streams to ensure academic integrity.
                </Text>
              </Alert>

              <VStack align="stretch" spacing={3}>
                <Flex bg="#1e1e2e" p={4} borderRadius="lg" align="center" justify="space-between">
                  <HStack spacing={3}>
                    <FaVideo color="#a855f7" size="20px" />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="white">
                        Webcam & Audio Stream
                      </Text>
                      <Text fontSize="xs" color="#a6adc8">
                        Records video feed for proctor verification
                      </Text>
                    </Box>
                  </HStack>
                  <Badge colorScheme="purple">Required</Badge>
                </Flex>

                <Flex bg="#1e1e2e" p={4} borderRadius="lg" align="center" justify="space-between">
                  <HStack spacing={3}>
                    <FaDesktop color="#a855f7" size="20px" />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="white">
                        Screen Sharing Capture
                      </Text>
                      <Text fontSize="xs" color="#a6adc8">
                        Records full display monitor output
                      </Text>
                    </Box>
                  </HStack>
                  <Badge colorScheme="purple">Required</Badge>
                </Flex>

                <Flex bg="#1e1e2e" p={4} borderRadius="lg" align="center" justify="space-between">
                  <HStack spacing={3}>
                    <FaShieldAlt color="#a855f7" size="20px" />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="white">
                        Tab-Switch Audit Monitor
                      </Text>
                      <Text fontSize="xs" color="#a6adc8">
                        Logs window focus changes and tab switches
                      </Text>
                    </Box>
                  </HStack>
                  <Badge colorScheme="green">Active</Badge>
                </Flex>
              </VStack>

              <Box bg="#11111b" p={4} borderRadius="lg" border="1px solid #313244">
                <Text fontSize="xs" fontWeight="bold" color="purple.300" mb={1}>
                  Assessment Rules:
                </Text>
                <Text fontSize="xs" color="#a6adc8" lineHeight="1.5">
                  1. You have <strong>{activeCodeObj?.maxDurationMinutes || 60} minutes</strong> once launched.<br />
                  2. Do not switch tabs or minimize the browser window.<br />
                  3. You can run test cases freely before final submission.
                </Text>
              </Box>

              <Button
                size="lg"
                bg="#7C3AED"
                color="white"
                _hover={{ bg: '#6D28D9' }}
                onClick={handleStartAssessment}
              >
                Grant Permissions & Start OA
              </Button>
            </VStack>
          </Container>
        </Flex>
      )}

      {/* STEP 3: MAIN PURPLE HACKERRANK IDE */}
      {step === 'ASSESSMENT' && (
        <Flex direction="column" h="100vh" overflow="hidden" bg="#0f111a">
          {/* Top Header Bar */}
          <OAHeader
            problems={OA_PROBLEMS}
            currentProblemIndex={currentProblemIndex}
            onSelectProblem={idx => setCurrentProblemIndex(idx)}
            candidateName={`${candidateName} (${candidateEmail})`}
            timeRemainingSeconds={timeRemainingSeconds}
            cameraActive={cameraActive}
            screenShareActive={screenShareActive}
            onRunCode={handleRunCode}
            onSubmitTest={handleSubmitCode}
            onEndAssessment={handleFinalSubmit}
            onOpenAdminModal={onOpenAdmin}
            isRunning={isRunning}
          />

          {/* Main 2-Pane Split Workspace */}
          <Flex flex="1" overflow="hidden">
            {/* Left Split Pane: Problem Statement & Submissions */}
            <Box w="45%" h="100%" borderRight="2px solid #422f7e" overflow="hidden">
              <OAProblemPane
                problem={currentProblem}
                submissions={submissions}
                proctoringEvents={proctoringEvents}
              />
            </Box>

            {/* Right Split Pane: Code Editor & Test Cases */}
            <Flex w="55%" h="100%" direction="column" overflow="hidden">
              {/* Code Editor Top Portion */}
              <Box flex="1" overflow="hidden">
                <OACodeEditor
                  language={activeLanguage}
                  onLanguageChange={lang => setActiveLanguage(lang)}
                  code={currentCode}
                  onChange={handleCodeChange}
                  onResetTemplate={handleResetTemplate}
                />
              </Box>

              {/* Test Runner Bottom Portion */}
              <OATestRunnerPane
                problem={currentProblem}
                testResults={testResults[currentProblem.id] || null}
                isRunning={isRunning}
                customInput={customInputs[currentProblem.id] || ''}
                onCustomInputChange={val =>
                  setCustomInputs(prev => ({ ...prev, [currentProblem.id]: val }))
                }
                isCollapsed={isTestPanelCollapsed}
                onToggleCollapse={() => setIsTestPanelCollapsed(!isTestPanelCollapsed)}
              />
            </Flex>
          </Flex>

          {/* WebRTC Camera & Screen Stream Proctoring Overlay */}
          <ProctoringRecorder
            isActive={step === 'ASSESSMENT'}
            onLogEvent={logProctoringEvent}
            onStreamsReady={(cam, screen) => {
              setCameraActive(cam);
              setScreenShareActive(screen);
            }}
            onMediaRecorded={blob => setRecordedVideoBlob(blob)}
          />
        </Flex>
      )}

      {/* STEP 4: COMPLETION SUMMARY SCREEN */}
      {step === 'COMPLETED' && (
        <Flex minH="100vh" align="center" justify="center" p={4} bg="#0f111a">
          <Container maxW="lg">
            <VStack
              bg="#181825"
              p={8}
              borderRadius="2xl"
              boxShadow="0 20px 40px rgba(0,0,0,0.6)"
              border="1px solid #422f7e"
              spacing={6}
              align="stretch"
            >
              <Flex direction="column" align="center" textAlign="center" gap={2}>
                <FaTrophy color="#f9e2af" size="48px" />
                <Heading size="lg" color="white" mt={2}>
                  Assessment Submitted!
                </Heading>
                <Text fontSize="sm" color="#a6adc8">
                  Thank you, <strong>{candidateName}</strong> ({candidateEmail}). Your online assessment has been submitted.
                </Text>
              </Flex>

              <VStack bg="#1e1e2e" p={4} borderRadius="lg" spacing={3} align="stretch">
                <Flex justify="space-between">
                  <Text fontSize="xs" color="#a6adc8">Candidate Access Code:</Text>
                  <Text fontSize="xs" fontWeight="bold" fontFamily="Space Mono, monospace" color="purple.200">
                    {activeCodeObj?.code || 'N/A'}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs" color="#a6adc8">Candidate Email:</Text>
                  <Text fontSize="xs" fontWeight="bold" color="white">
                    {candidateEmail}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs" color="#a6adc8">Submissions Recorded:</Text>
                  <Text fontSize="xs" fontWeight="bold" color="white">
                    {submissions.length} Total
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs" color="#a6adc8">Proctoring Events Logged:</Text>
                  <Badge colorScheme={proctoringEvents.some(e => e.type === 'TAB_SWITCH') ? 'amber' : 'green'}>
                    {proctoringEvents.length} Events
                  </Badge>
                </Flex>
              </VStack>

              {recordedVideoBlob && (
                <Button
                  leftIcon={<FaDownload />}
                  variant="outline"
                  borderColor="purple.400"
                  color="purple.200"
                  onClick={handleDownloadSessionVideo}
                >
                  Download Session Video Recording (.webm)
                </Button>
              )}

              <Button
                size="lg"
                bg="#7C3AED"
                color="white"
                _hover={{ bg: '#6D28D9' }}
                onClick={() => setStep('VERIFY')}
              >
                Return to Login
              </Button>
            </VStack>
          </Container>
        </Flex>
      )}
    </Box>
  );
};
