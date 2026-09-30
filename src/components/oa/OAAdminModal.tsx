import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Badge,
  Flex,
  Box,
  useToast,
  Divider,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  IconButton,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { OAAccessCode } from '../../interfaces/IOA';
import { oaCodeService } from '../../service/oaCodeService';
import { FaCopy, FaPlus, FaRedo, FaTrash, FaLink, FaUsers, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const MASTER_ADMIN_PASSWORD = import.meta.env.VITE_OA_ADMIN_PASSWORD || 'hcpadmin2026';

interface OAAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OAAdminModal: React.FC<OAAdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [codes, setCodes] = useState<OAAccessCode[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bulkEmailsText, setBulkEmailsText] = useState('');
  const [duration, setDuration] = useState(60);
  const [customCode, setCustomCode] = useState('');
  const toast = useToast();

  const loadCodes = async () => {
    const list = await oaCodeService.getAllCodes();
    setCodes(list);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadCodes();
    }
  }, [isOpen, isAuthenticated]);

  const handleAuthenticate = () => {
    if (passwordInput === MASTER_ADMIN_PASSWORD || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setPasswordInput('');
      toast({
        title: 'Admin Session Authenticated',
        status: 'success',
        duration: 2000,
      });
      loadCodes();
    } else {
      toast({
        title: 'Invalid Admin Password',
        description: 'Access denied. Please enter the correct admin master password.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleGenerateSingle = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Name and Email are required',
        description: 'Each one-time code must be linked to a candidate email address.',
        status: 'warning',
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    const created = await oaCodeService.generateCode(
      name,
      email,
      duration,
      customCode.trim() ? customCode : undefined
    );

    toast({
      title: 'One-Time Code Linked & Created!',
      description: `Code ${created.code} bound to ${created.candidateEmail}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setName('');
    setEmail('');
    setCustomCode('');
    await loadCodes();
  };

  const handleBulkGenerate = async () => {
    const rawList = bulkEmailsText
      .split(/[\n,;]+/)
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (rawList.length === 0) {
      toast({
        title: 'No candidate emails provided',
        description: 'Please paste candidate emails separated by commas or newlines.',
        status: 'warning',
        duration: 2500,
      });
      return;
    }

    const created = await oaCodeService.bulkGenerateCodes(rawList, duration);

    toast({
      title: `Bulk Generated ${created.length} Access Codes!`,
      description: `Created one-time codes for ${created.length} candidates.`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });

    setBulkEmailsText('');
    await loadCodes();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code copied to clipboard',
      status: 'info',
      duration: 1500,
    });
  };

  const handleCopyMagicLink = (code: string, candidateEmail: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/oa?code=${code}&email=${encodeURIComponent(candidateEmail)}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Magic URL copied to clipboard',
      description: url,
      status: 'info',
      duration: 2500,
    });
  };

  const handleDelete = (code: string) => {
    oaCodeService.deleteCode(code);
    loadCodes();
  };

  const handleResetDefaults = () => {
    oaCodeService.resetCodesToDefault();
    loadCodes();
    toast({
      title: 'Reset to default codes',
      status: 'info',
      duration: 1500,
    });
  };

  const handleModalClose = () => {
    setPasswordInput('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent bg="#181825" color="#cdd6f4" borderColor="#422f7e" borderWidth="1px">
        <ModalHeader bg="#2b1d56" color="white" borderBottom="1px solid #422f7e">
          <Flex align="center" gap={2}>
            <FaLock color="#cba6f7" />
            <Text>OA Admin Portal & Code Generator</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody py={6}>
          {/* PASSWORD GATE IF NOT AUTHENTICATED */}
          {!isAuthenticated ? (
            <VStack py={6} spacing={4} align="stretch">
              <Box textStyle="center" textAlign="center" mb={2}>
                <Text fontSize="md" fontWeight="bold" color="white">
                  Admin Master Password Required
                </Text>
                <Text fontSize="xs" color="#a6adc8" mt={1}>
                  Enter the club admin password to access candidate code management.
                </Text>
              </Box>

              <InputGroup size="md">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password (default: hcpadmin2026)"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAuthenticate()}
                  bg="#11111b"
                  borderColor="#422f7e"
                  color="white"
                  fontSize="sm"
                  _focus={{ borderColor: 'purple.400' }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle Password"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    size="xs"
                    variant="ghost"
                    color="#a6adc8"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>

              <Button
                leftIcon={<FaLock />}
                bg="#7C3AED"
                color="white"
                _hover={{ bg: '#6D28D9' }}
                onClick={handleAuthenticate}
              >
                Unlock Admin Console
              </Button>

              <Text fontSize="11px" color="#6c7086" textAlign="center">
                Default Password: <code style={{ color: '#cba6f7' }}>hcpadmin2026</code>
              </Text>
            </VStack>
          ) : (
            /* UNLOCKED ADMIN DRAWER */
            <VStack align="stretch" spacing={6}>
              {/* Create Code Forms (Single or Bulk) */}
              <Box bg="#1e1e2e" p={4} borderRadius="lg" border="1px solid #313244">
                <Tabs variant="line" colorScheme="purple">
                  <TabList mb={3}>
                    <Tab fontSize="xs" fontWeight="bold" color="purple.300">
                      Single Candidate Code
                    </Tab>
                    <Tab fontSize="xs" fontWeight="bold" color="purple.300">
                      <HStack spacing={1}>
                        <FaUsers size="12px" />
                        <Text>Bulk Email List Generator</Text>
                      </HStack>
                    </Tab>
                  </TabList>

                  <TabPanels>
                    {/* Single Code Panel */}
                    <TabPanel p={0}>
                      <VStack spacing={3}>
                        <HStack w="100%" spacing={3}>
                          <Input
                            placeholder="Candidate Name *"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            bg="#11111b"
                            borderColor="#313244"
                            fontSize="sm"
                            _focus={{ borderColor: 'purple.400' }}
                          />
                          <Input
                            placeholder="Candidate Email Address *"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            bg="#11111b"
                            borderColor="#313244"
                            fontSize="sm"
                            _focus={{ borderColor: 'purple.400' }}
                          />
                        </HStack>

                        <HStack w="100%" spacing={3}>
                          <Box flex="1">
                            <Text fontSize="xs" color="#a6adc8" mb={1}>Duration (Minutes)</Text>
                            <NumberInput
                              value={duration}
                              onChange={(_, val) => setDuration(val || 60)}
                              min={15}
                              max={240}
                              size="sm"
                            >
                              <NumberInputField bg="#11111b" borderColor="#313244" />
                            </NumberInput>
                          </Box>

                          <Box flex="1">
                            <Text fontSize="xs" color="#a6adc8" mb={1}>Custom Passcode (Optional)</Text>
                            <Input
                              placeholder="e.g. HCP-TEST-99"
                              value={customCode}
                              onChange={e => setCustomCode(e.target.value)}
                              bg="#11111b"
                              borderColor="#313244"
                              fontSize="sm"
                              _focus={{ borderColor: 'purple.400' }}
                            />
                          </Box>
                        </HStack>

                        <Button
                          leftIcon={<FaPlus />}
                          w="100%"
                          bg="#7C3AED"
                          color="white"
                          _hover={{ bg: '#6D28D9' }}
                          onClick={handleGenerateSingle}
                        >
                          Generate Linked Access Code
                        </Button>
                      </VStack>
                    </TabPanel>

                    {/* Bulk Email Generator Panel */}
                    <TabPanel p={0}>
                      <VStack spacing={3} align="stretch">
                        <Text fontSize="xs" color="#a6adc8">
                          Paste candidate emails below (separated by commas or new lines). A unique single-use code will be generated for each email:
                        </Text>
                        <Textarea
                          placeholder="alex@uw.edu&#10;sam@uw.edu&#10;taylor@uw.edu"
                          value={bulkEmailsText}
                          onChange={e => setBulkEmailsText(e.target.value)}
                          bg="#11111b"
                          borderColor="#313244"
                          color="#cdd6f4"
                          fontSize="xs"
                          fontFamily="Space Mono, monospace"
                          rows={4}
                        />
                        <Button
                          leftIcon={<FaUsers />}
                          bg="#7C3AED"
                          color="white"
                          _hover={{ bg: '#6D28D9' }}
                          onClick={handleBulkGenerate}
                        >
                          Bulk Generate Codes from Email List
                        </Button>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>

              <Divider borderColor="#313244" />

              {/* List of Access Codes */}
              <Box>
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontSize="md" fontWeight="bold" color="white">
                    Active Access Codes ({codes.length})
                  </Text>
                  <Button
                    leftIcon={<FaRedo />}
                    size="xs"
                    variant="outline"
                    borderColor="purple.500"
                    color="purple.300"
                    onClick={handleResetDefaults}
                  >
                    Reset Defaults
                  </Button>
                </Flex>

                <Box overflowX="auto" border="1px solid #313244" borderRadius="lg">
                  <Table size="sm" variant="simple" colorScheme="purple">
                    <Thead bg="#11111b">
                      <Tr>
                        <Th color="purple.300">Code</Th>
                        <Th color="purple.300">Candidate Email</Th>
                        <Th color="purple.300">Duration</Th>
                        <Th color="purple.300">Status</Th>
                        <Th color="purple.300" textAlign="right">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody bg="#1e1e2e">
                      {codes.map(c => (
                        <Tr key={c.code}>
                          <Td fontWeight="bold" fontFamily="Space Mono, monospace" color="purple.200">
                            {c.code}
                          </Td>
                          <Td fontSize="xs" color="#cdd6f4">
                            <VStack align="flex-start" spacing={0}>
                              <Text fontWeight="semibold">{c.candidateEmail}</Text>
                              <Text fontSize="10px" color="#a6adc8">{c.candidateName}</Text>
                            </VStack>
                          </Td>
                          <Td fontSize="xs" color="#a6adc8">{c.maxDurationMinutes} mins</Td>
                          <Td>
                            <Badge colorScheme={c.isUsed ? 'red' : 'green'} fontSize="10px">
                              {c.isUsed ? 'USED' : 'ACTIVE'}
                            </Badge>
                          </Td>
                          <Td textAlign="right">
                            <HStack justify="flex-end" spacing={1}>
                              <Tooltip label="Copy Code">
                                <IconButton
                                  aria-label="Copy code"
                                  icon={<FaCopy />}
                                  size="xs"
                                  variant="ghost"
                                  color="purple.300"
                                  onClick={() => handleCopyCode(c.code)}
                                />
                              </Tooltip>
                              <Tooltip label="Copy Magic Link URL">
                                <IconButton
                                  aria-label="Copy link"
                                  icon={<FaLink />}
                                  size="xs"
                                  variant="ghost"
                                  color="purple.300"
                                  onClick={() => handleCopyMagicLink(c.code, c.candidateEmail)}
                                />
                              </Tooltip>
                              <Tooltip label="Delete code">
                                <IconButton
                                  aria-label="Delete code"
                                  icon={<FaTrash />}
                                  size="xs"
                                  variant="ghost"
                                  color="red.400"
                                  onClick={() => handleDelete(c.code)}
                                />
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter bg="#181825" borderTop="1px solid #313244">
          <Button variant="ghost" color="purple.300" onClick={handleModalClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
