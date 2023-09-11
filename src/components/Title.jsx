import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';

const Title = ({ children, color, ...rest }) => {
  const {
    colors: {
      brand: { 500: brand },
    },
  } = useTheme();
  return (
    <Heading
      fontWeight={'normal'}
      textTransform={'capitalize'}
      color={'transparent'}
      sx={{
        WebkitTextStroke: `1.5px ${color || brand}}`,
      }}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default Title;
