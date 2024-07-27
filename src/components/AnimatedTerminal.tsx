import React, { useState, useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const commands = [
  'git clone git@github.com:hcp-uw/your-new-project.git    ',
  'cd your-new-project    ',
  'echo "# Your New Project" > README.md    ',
  'npm init -y    ',
  'npm install react react-dom react-scripts    ',
  'git add .    ',
  'git commit -m "Initial commit"    ',
  'git push origin main    ',
  '^C    ',
  'yes | rm -rf node_modules    ',
  'echo "node_modules/" > .gitignore    ',
  'npm install    ',
  'git commit -am "Add node_modules to .gitignore"    ',
  'git push origin main    ',
  'git checkout -b feature/your-new-feature    ',
  'touch your-new-feature.js    ',
  'npm run start    ',
  '^C    ',
  'git add .    ',
  'git commit -m "Added my new feature!"    ',
  'git push origin feature/your-new-feature    ',
  'git checkout main    ',
  'git merge feature/your-new-feature    ',
];

export const AnimatedTerminal: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('$ ');
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('green.500', 'green.300');

  useEffect(() => {
    if (commandIndex < commands.length) {
      const timer = setTimeout(() => {
        if (charIndex < commands[commandIndex].length) {
          setCurrentCommand(prev => prev + commands[commandIndex][charIndex]);
          setCharIndex(charIndex + 1);
        } else if (commandIndex < commands.length - 1) {
          setCurrentCommand(prev => prev + '\n$ ');
          setCommandIndex(commandIndex + 1);
          setCharIndex(0);
        } else {
          setCommandIndex(0);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [commandIndex, charIndex]);

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      fontFamily="monospace"
      whiteSpace="pre-wrap"
      overflow="hidden"
      marginTop="5em"
      minHeight="95vh"
      width="100%"
    >
      <Text color={textColor}>{currentCommand}</Text>
    </Box>
  );
};