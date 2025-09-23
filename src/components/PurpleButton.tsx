import { Button } from '@chakra-ui/react';

interface PurpleButtonProps {
  text: string;
  [key: string]: any;
}

const PurpleButton: React.FC<PurpleButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      bgColor="palette.lightPurple"
      color="palette.darkPurple"
      borderColor="palette.darkPurple"
      borderWidth="2px"
      fontSize="15px"
      fontWeight="700"
      px="19px"
      py="21px"
      borderRadius="20px"
      _hover={{
        bgColor: 'palette.darkPurple',
        color: 'palette.lightPurple',
        transition: '0.3s',
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default PurpleButton;
