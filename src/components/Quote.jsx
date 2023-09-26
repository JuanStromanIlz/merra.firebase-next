import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Title from './Title';

export default function Quote({ children }) {
  return (
    <Box
      as='blockquote'
      py={3}
      borderBottomWidth={1}
      borderTopWidth={1}
      borderColor={'brand.500'}
    >
      <Title fontSize='lg' lineHeight={undefined}>
        {children}
      </Title>
    </Box>
  );
}
