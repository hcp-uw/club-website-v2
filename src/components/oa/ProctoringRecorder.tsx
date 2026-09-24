import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  HStack,
  VStack,
  Tooltip,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  FaVideo,
  FaDesktop,
  FaCompress,
  FaExpand,
  FaDownload,
} from 'react-icons/fa';
import { ProctoringEvent } from '../../interfaces/IOA';

interface ProctoringRecorderProps {
  onLogEvent: (event: Omit<ProctoringEvent, 'id'>) => void;
  onStreamsReady?: (cameraReady: boolean, screenReady: boolean) => void;
  isActive: boolean;
  onMediaRecorded?: (blob: Blob) => void;
}

export const ProctoringRecorder: React.FC<ProctoringRecorderProps> = ({
  onLogEvent,
  onStreamsReady,
  isActive,
  onMediaRecorded,
}) => {
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasInitializedRef = useRef<boolean>(false);

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [screenActive, setScreenActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Start Camera Stream
  const startCamera = async (): Promise<MediaStream | null> => {
    if (cameraStream && cameraStream.active) {
      return cameraStream;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: true,
      });
      setCameraStream(stream);
      setCameraActive(true);

      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
      }

      onLogEvent({
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        description: 'Webcam feed and audio active.',
      });
      return stream;
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraActive(false);
      onLogEvent({
        timestamp: new Date().toLocaleTimeString(),
        type: 'CAMERA_DISCONNECTED',
        description: 'Webcam access requested but failed/denied.',
      });
      return null;
    }
  };

  // Start Screen Sharing Stream (Ensured to run ONCE per session)
  const startScreenShare = async (): Promise<MediaStream | null> => {
    if (screenStream && screenStream.active) {
      return screenStream;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: false,
      });

      setScreenStream(stream);
      setScreenActive(true);

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = stream;
      }

      // Handle user stopping screen share via browser bar
      stream.getVideoTracks()[0].onended = () => {
        setScreenActive(false);
        onLogEvent({
          timestamp: new Date().toLocaleTimeString(),
          type: 'SCREEN_SHARE_STOPPED',
          description: 'Candidate stopped screen sharing stream.',
        });
      };

      onLogEvent({
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        description: 'Screen sharing stream active.',
      });
      return stream;
    } catch (err: any) {
      console.warn('Screen share error:', err);
      setScreenActive(false);
      onLogEvent({
        timestamp: new Date().toLocaleTimeString(),
        type: 'SCREEN_SHARE_STOPPED',
        description: 'Screen sharing stream failed/denied.',
      });
      return null;
    }
  };

  // Initialize streams ONCE when test becomes active
  useEffect(() => {
    if (isActive && !hasInitializedRef.current) {
      hasInitializedRef.current = true;

      const initMedia = async () => {
        const camStream = await startCamera();
        const scStream = await startScreenShare();

        if (onStreamsReady) {
          onStreamsReady(Boolean(camStream), Boolean(scStream));
        }

        // Start MediaRecorder
        try {
          const combinedStream = new MediaStream();
          if (camStream) camStream.getTracks().forEach(t => combinedStream.addTrack(t));
          if (scStream) scStream.getTracks().forEach(t => combinedStream.addTrack(t));

          const targetStream = combinedStream.getTracks().length > 0 ? combinedStream : camStream || scStream;
          if (targetStream && typeof MediaRecorder !== 'undefined') {
            const recorder = new MediaRecorder(targetStream, { mimeType: 'video/webm;codecs=vp8' });
            recorder.ondataavailable = e => {
              if (e.data && e.data.size > 0) {
                recordedChunksRef.current.push(e.data);
              }
            };
            recorder.onstop = () => {
              const fullBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
              if (onMediaRecorded) {
                onMediaRecorded(fullBlob);
              }
            };
            recorder.start(5000); // chunk every 5 seconds
            mediaRecorderRef.current = recorder;
          }
        } catch (err) {
          console.warn('MediaRecorder error:', err);
        }
      };

      initMedia();
    }

    return () => {
      // Cleanup on unmount
      if (hasInitializedRef.current && !isActive) {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
        if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
        if (screenStream) screenStream.getTracks().forEach(t => t.stop());
        hasInitializedRef.current = false;
      }
    };
  }, [isActive]);

  // Attach video stream to ref if stream changes
  useEffect(() => {
    if (cameraVideoRef.current && cameraStream) {
      cameraVideoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Tab switch & focus monitoring
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        onLogEvent({
          timestamp: new Date().toLocaleTimeString(),
          type: 'TAB_SWITCH',
          description: 'Candidate switched tabs or minimized browser window!',
        });
      }
    };

    const handleBlur = () => {
      onLogEvent({
        timestamp: new Date().toLocaleTimeString(),
        type: 'WINDOW_BLUR',
        description: 'Candidate window lost focus.',
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isActive, onLogEvent]);

  // Download Recording Helper
  const downloadRecording = () => {
    if (recordedChunksRef.current.length === 0) return;
    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HCP_OA_Session_Recording_${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isActive) return null;

  return (
    <Box
      position="fixed"
      bottom="16px"
      right="16px"
      zIndex={1000}
      bg="#1e1e2e"
      borderColor="#422f7e"
      borderWidth="2px"
      borderRadius="xl"
      boxShadow="0 10px 30px rgba(0,0,0,0.5)"
      overflow="hidden"
      w={isMinimized ? '200px' : '280px'}
      transition="all 0.3s ease"
    >
      {/* Header */}
      <Flex
        bg="#422f7e"
        px={3}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        color="white"
      >
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg="#22c55e" className="animate-pulse" />
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wide">
            PROCTORING LIVE
          </Text>
        </HStack>

        <HStack spacing={1}>
          <Tooltip label="Download Recording">
            <IconButton
              aria-label="Download"
              icon={<FaDownload />}
              size="xs"
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={downloadRecording}
            />
          </Tooltip>
          <IconButton
            aria-label="Toggle Minimize"
            icon={isMinimized ? <FaExpand /> : <FaCompress />}
            size="xs"
            variant="ghost"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={() => setIsMinimized(!isMinimized)}
          />
        </HStack>
      </Flex>

      {!isMinimized && (
        <VStack spacing={2} p={3} bg="#181825" align="stretch">
          {/* Webcam Live Preview Video */}
          <Box
            position="relative"
            h="150px"
            bg="black"
            borderRadius="md"
            overflow="hidden"
            border="1px solid #313244"
          >
            <video
              ref={cameraVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Badge
              position="absolute"
              top={2}
              left={2}
              colorScheme={cameraActive ? 'purple' : 'red'}
              fontSize="10px"
              px={2}
              borderRadius="full"
            >
              <HStack spacing={1}>
                <FaVideo size="10px" />
                <Text>{cameraActive ? 'WEBCAM ON' : 'NO WEBCAM'}</Text>
              </HStack>
            </Badge>
          </Box>

          {/* Screen Share Status */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            p={2}
            bg="#26233a"
            borderRadius="md"
            border="1px solid #422f7e"
          >
            <HStack spacing={2} color="purple.200">
              <FaDesktop />
              <Text fontSize="xs" fontWeight="medium">
                Screen Recording
              </Text>
            </HStack>
            <Badge colorScheme={screenActive ? 'green' : 'amber'} fontSize="10px">
              {screenActive ? 'RECORDING' : 'DISCONNECTED'}
            </Badge>
          </Flex>

          {(!cameraActive || !screenActive) && (
            <Alert status="warning" size="sm" borderRadius="md" py={1} px={2} bg="amber.900" color="amber.100">
              <AlertIcon boxSize="12px" />
              <Text fontSize="10px">
                {!cameraActive && !screenActive
                  ? 'Camera & Screen permissions required.'
                  : !cameraActive
                  ? 'Camera disconnected!'
                  : 'Screen sharing disconnected!'}
              </Text>
            </Alert>
          )}

          {/* Hidden screen video element for stream retention */}
          <video ref={screenVideoRef} autoPlay playsInline muted style={{ display: 'none' }} />
        </VStack>
      )}
    </Box>
  );
};
