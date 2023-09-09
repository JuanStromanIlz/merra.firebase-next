import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Title from './Title';

export default function Quote({ children }) {
  return (
    <Box
      as='blockquote'
      p={3}
      borderBottomWidth={1}
      borderTopWidth={1}
      borderColor={'brand.500'}
    >
      <Title size='md'>{children}</Title>
    </Box>
  );
}
