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
      fontSize={'4xl'}
      fontWeight={'bold'}
      textTransform={'capitalize'}
      letterSpacing={1}
      lineHeight={'80%'}
      textAlign={'center'}
      color={color || brand}
      {...rest}
    >
      {children}
    </Heading>
  );
});

export default Title;
