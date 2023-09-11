import React, { forwardRef } from 'react';
import { Heading } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';

const Title = forwardRef(function Title({ children, color, ...rest }, ref) {
  const {
    colors: {
      brand: { 500: brand },
    },
  } = useTheme();
  return (
    <Heading
      ref={ref}
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
});

export default Title;
