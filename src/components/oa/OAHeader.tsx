import React, { useRef } from 'react';
import {
  Flex,
  Box,
  Text,
  HStack,
  Button,
  Select,
  Badge,
  IconButton,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { OAProblem } from '../../interfaces/IOA';
import { FaPlay, FaCheckCircle, FaClock, FaVideo, FaDesktop, FaKey, FaFlag } from 'react-icons/fa';
import HcpLogo from '../../assets/logo-with-outline-without-tags.png';

interface OAHeaderProps {
  problems: OAProblem[];
  currentProblemIndex: number;
  onSelectProblem: (index: number) => void;
  candidateName: string;
  timeRemainingSeconds: number;
  cameraActive: boolean;
  screenShareActive: boolean;
  onRunCode: () => void;
  onSubmitTest: () => void;
  onEndAssessment: () => void;
  onOpenAdminModal?: () => void;
  isRunning?: boolean;
}

export const OAHeader: React.FC<OAHeaderProps> = ({
  problems,
  currentProblemIndex,
  onSelectProblem,
  candidateName,
  timeRemainingSeconds,
  cameraActive,
  screenShareActive,
  onRunCode,
  onSubmitTest,
  onEndAssessment,
  onOpenAdminModal,
  isRunning = false,
}) => {
  const { isOpen: isEndOpen, onOpen: onOpenEnd, onClose: onCloseEnd } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const pad = (n: number) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  const isLowTime = timeRemainingSeconds < 300; // < 5 mins

  const handleConfirmEnd = () => {
    onCloseEnd();
    onEndAssessment();
  };

  return (
    <>
      <Flex
        bg="#2b1d56"
        color="white"
        h="64px"
        px={4}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="2px solid #422f7e"
        boxShadow="0 4px 12px rgba(0,0,0,0.3)"
      >
        {/* Left: Branding & Candidate Badge */}
        <HStack spacing={4}>
          <Flex alignItems="center" gap={2}>
            <img src={HcpLogo} alt="HCP Logo" style={{ width: '38px', height: 'auto' }} />
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="white" lineHeight="1">
                HCP ASSESSMENT
              </Text>
              <Text fontSize="10px" color="purple.200" fontFamily="Space Mono, monospace">
                HACKERRANK PURPLE EDITION
              </Text>
            </Box>
          </Flex>

          <Box h="24px" w="1px" bg="purple.600" display={{ base: 'none', md: 'block' }} />

          {/* Candidate Info Badge */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Text fontSize="xs" color="purple.200">Candidate</Text>
            <Text fontSize="xs" fontWeight="semibold" color="white">{candidateName}</Text>
          </Box>
        </HStack>

        {/* Center: Problem Selector & Proctoring Badges */}
        <HStack spacing={3}>
          {/* Problem Switcher */}
          <Select
            size="sm"
            w={{ base: '140px', md: '220px' }}
            bg="#1e1e2e"
            borderColor="#6B46C1"
            color="white"
            borderRadius="md"
            value={currentProblemIndex}
            onChange={e => onSelectProblem(Number(e.target.value))}
          >
            {problems.map((p, idx) => (
              <option key={p.id} value={idx} style={{ background: '#181825', color: '#fff' }}>
                {idx + 1}. {p.title.replace(/^\d+\.\s*/, '')} ({p.difficulty})
              </option>
            ))}
          </Select>

          {/* Proctoring Badges */}
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            <Badge
              colorScheme={cameraActive ? 'green' : 'red'}
              variant="solid"
              fontSize="10px"
              px={2}
              py={0.5}
              borderRadius="full"
            >
              <HStack spacing={1}>
                <FaVideo size="9px" />
                <Text>{cameraActive ? 'CAM' : 'NO CAM'}</Text>
              </HStack>
            </Badge>
            <Badge
              colorScheme={screenShareActive ? 'green' : 'amber'}
              variant="solid"
              fontSize="10px"
              px={2}
              py={0.5}
              borderRadius="full"
            >
              <HStack spacing={1}>
                <FaDesktop size="9px" />
                <Text>{screenShareActive ? 'REC' : 'NO REC'}</Text>
              </HStack>
            </Badge>
          </HStack>
        </HStack>

        {/* Right: Timer & Action Buttons */}
        <HStack spacing={3}>
          {/* Admin drawer shortcut button */}
          {onOpenAdminModal && (
            <Tooltip label="Admin Access Codes Management">
              <IconButton
                aria-label="Admin Access Codes"
                icon={<FaKey />}
                size="sm"
                variant="ghost"
                color="purple.300"
                _hover={{ bg: 'purple.800' }}
                onClick={onOpenAdminModal}
              />
            </Tooltip>
          )}

          {/* Countdown Timer */}
          <Flex
            alignItems="center"
            gap={2}
            bg={isLowTime ? 'red.900' : '#1e1e2e'}
            borderColor={isLowTime ? 'red.500' : '#422f7e'}
            borderWidth="1px"
            px={3}
            py={1.5}
            borderRadius="md"
          >
            <FaClock color={isLowTime ? '#f87171' : '#c084fc'} size="13px" />
            <Text
              fontSize="xs"
              fontWeight="bold"
              fontFamily="Space Mono, monospace"
              color={isLowTime ? 'red.200' : 'purple.100'}
            >
              {formatTime(timeRemainingSeconds)}
            </Text>
          </Flex>

          {/* Run Code Button */}
          <Button
            leftIcon={<FaPlay size="10px" />}
            size="sm"
            variant="outline"
            borderColor="#9F7AEA"
            color="white"
            _hover={{ bg: '#422f7e', borderColor: 'purple.300' }}
            isLoading={isRunning}
            onClick={onRunCode}
          >
            Run Code
          </Button>

          {/* Submit Solution Button */}
          <Button
            leftIcon={<FaCheckCircle size="12px" />}
            size="sm"
            bg="#7C3AED"
            color="white"
            _hover={{ bg: '#6D28D9' }}
            _active={{ bg: '#5B21B6' }}
            boxShadow="0 2px 8px rgba(124, 58, 237, 0.4)"
            isLoading={isRunning}
            onClick={onSubmitTest}
          >
            Submit Code
          </Button>

          {/* END TEST / FINISH ASSESSMENT BUTTON */}
          <Button
            leftIcon={<FaFlag size="11px" />}
            size="sm"
            colorScheme="red"
            variant="solid"
            _hover={{ bg: 'red.600' }}
            onClick={onOpenEnd}
          >
            End Test
          </Button>
        </HStack>
      </Flex>

      {/* CONFIRMATION MODAL TO END TEST */}
      <AlertDialog
        isOpen={isEndOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseEnd}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(5px)">
          <AlertDialogContent bg="#181825" color="#cdd6f4" borderColor="red.500" borderWidth="1px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
              Finish & End Assessment?
            </AlertDialogHeader>

            <AlertDialogBody fontSize="sm" color="#a6adc8">
              Are you sure you want to end your test session now? All current submissions will be finalized and proctoring recording will be saved.
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} variant="ghost" color="purple.300" onClick={onCloseEnd}>
                Continue Test
              </Button>
              <Button colorScheme="red" onClick={handleConfirmEnd}>
                Yes, End Assessment
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
