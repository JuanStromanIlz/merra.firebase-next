import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Title from './Title';

const FolderLayout = ({ children, title }) => {
  return (
    <Flex direction={'column'} gap={6}>
      <Title>{title}</Title>
      {children}
    </Flex>
  );
};

export default FolderLayout;
