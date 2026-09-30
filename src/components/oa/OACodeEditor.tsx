import React, { useRef, useState } from 'react';
import {
  Box,
  Flex,
  Select,
  Text,
  HStack,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { OALanguage } from '../../interfaces/IOA';
import { FaUndo, FaFont } from 'react-icons/fa';

interface OACodeEditorProps {
  language: OALanguage;
  onLanguageChange: (lang: OALanguage) => void;
  code: string;
  onChange: (val: string) => void;
  onResetTemplate: () => void;
}

export const OACodeEditor: React.FC<OACodeEditorProps> = ({
  language,
  onLanguageChange,
  code,
  onChange,
  onResetTemplate,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(14);

  const lineCount = (code.match(/\n/g) || []).length + 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Handle Tab key insertion (4 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);

      // Restore cursor position after state update
      setTimeout(() => {
        if (target) {
          target.selectionStart = target.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleFontSizeCycle = () => {
    const sizes = [12, 14, 16, 18];
    const nextIdx = (sizes.indexOf(fontSize) + 1) % sizes.length;
    setFontSize(sizes[nextIdx]);
  };

  return (
    <Flex direction="column" h="100%" bg="#1e1e2e" color="#cdd6f4" overflow="hidden">
      {/* Top Toolbar */}
      <Flex
        bg="#181825"
        px={4}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #313244"
      >
        <HStack spacing={3}>
          <Text fontSize="xs" fontWeight="bold" color="purple.300" letterSpacing="wider">
            LANGUAGE
          </Text>
          <Select
            size="xs"
            w="150px"
            bg="#2b2640"
            borderColor="#422f7e"
            color="white"
            borderRadius="md"
            value={language}
            onChange={e => onLanguageChange(e.target.value as OALanguage)}
            _hover={{ borderColor: 'purple.400' }}
          >
            <option value="python" style={{ background: '#181825' }}>Python 3</option>
            <option value="javascript" style={{ background: '#181825' }}>JavaScript (Node.js)</option>
            <option value="typescript" style={{ background: '#181825' }}>TypeScript</option>
            <option value="cpp" style={{ background: '#181825' }}>C++ 17</option>
            <option value="java" style={{ background: '#181825' }}>Java 17</option>
            <option value="go" style={{ background: '#181825' }}>Go</option>
            <option value="rust" style={{ background: '#181825' }}>Rust</option>
          </Select>
        </HStack>

        <HStack spacing={2}>
          <Tooltip label={`Font Size (${fontSize}px)`}>
            <IconButton
              aria-label="Font Size"
              icon={<FaFont />}
              size="xs"
              variant="ghost"
              color="purple.200"
              onClick={handleFontSizeCycle}
              _hover={{ bg: 'whiteAlpha.100' }}
            />
          </Tooltip>
          <Tooltip label="Reset to default template">
            <Button
              leftIcon={<FaUndo />}
              size="xs"
              variant="outline"
              borderColor="purple.500"
              color="purple.200"
              onClick={onResetTemplate}
              _hover={{ bg: 'purple.900' }}
            >
              Reset Code
            </Button>
          </Tooltip>
        </HStack>
      </Flex>

      {/* Editor Body with Line Numbers */}
      <Flex flex="1" overflow="hidden" position="relative">
        {/* Line Numbers Column */}
        <Box
          bg="#181825"
          color="#6c7086"
          py={3}
          px={3}
          fontFamily="Space Mono, Monaco, Courier, monospace"
          fontSize={`${fontSize}px`}
          lineHeight="1.5"
          userSelect="none"
          textAlign="right"
          minW="45px"
          borderRight="1px solid #313244"
          overflowY="hidden"
        >
          {lineNumbers.map(n => (
            <div key={n}>{n}</div>
          ))}
        </Box>

        {/* Monospaced Textarea Editor */}
        <Box flex="1" position="relative" bg="#1e1e2e">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1e1e2e',
              color: '#cdd6f4',
              fontFamily: '"Fira Code", "Space Mono", Monaco, Consolas, monospace',
              fontSize: `${fontSize}px`,
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'none',
              padding: '12px 16px',
              caretColor: '#a6e3a1',
              whiteSpace: 'pre',
              tabSize: 4,
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
